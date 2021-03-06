# @genese/angular  

@genese/angular is an Angular library which allows you to remove your data-services and your DTO mappers. This module is a part of the [@genese](https://www.npmjs.com/package/genese) framework.

Simple example using @genese/angular: [@genese/angular-demo](https://github.com/geneseframework/genese-angular-demo)


## Table of Contents
* [Why use @genese/angular ?](#why-use-geneseangular-)
* [Installation](#installation)
* [Models](#models)
* [Methods](#methods)


## Why use @genese/angular ?

@genese/angular is a powerful tool which will improve your productivity in building web apps. 

This module will allow you to remove all your Angular data-services. It replaces the http requests located in your services, and replaces the mappers used to format data coming from the backend into typed objects.

Returning typed objects from your data-services to your components is fundamental : if you do not, your component could receive incorrect data from the backend, and your application would crash automatically. That's why the mappers are so important. Unfortunately, writing mappers is long and fastidious. More, you need to write unit tests for your mappers, and add some mock values to be able to do these tests. Idem for your http requests, which should be tested with some tools like HttMock. That's why writing data-services is so long and fastidious. 

So, what would you say if Genese could do all of that for you ? Yes, that's right : @genese/angular calls the http requests for you, and uses a Generic mapper which will send you back objects automatically typed ! In the next example, that means that you can simply destroy the file `book-data.service.ts` and put it in the garbage, with its associated test file `book-data.service.spec.ts`.

* Example

Actually, you probably have Angular data-services like this :

``book.model.ts``
```ts
export class Book = {
    id?: string;
    isAvailable?: boolean;
    name?: string;
    public editors?: [{
        name?: string,
        country.: string
    }];

    constructor() {}
}
```

``book-data.service.ts``
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BookDataService {

    constructor(private http: HttpClient) {}

    mapToBook(data: any): Book {
        let book = new Book();
        if (data && data.id) {
            book.id = data.id;
            book.isAvailable : data.isAvailable ? data.isAvailable : false;
            book.name : data.name ? data.name : '';
            book.editors = [];
            if (Array.isArray(data.editors)) {
                for (let editor of data.editors) {
                    let newEditor = {};
                    newEditor.name = editor.name ? editor.name : '';
                    newEditor.country = editor.country ? editor.country : '';
                    book.editors.push(newEditor);
                }
            }
        }
        return book;
    }

    getOne(id: string): Observable<Book> {
        this.http.get('http://localhost:3000/' + id)
            .pipe(
                map((data: any) => {
                    return this.mapToBook(data);
                }
            )
    }

    getAll(): Observable<Book[]> {
        this.http.get('http://localhost:3000/')
            .pipe(
                map((data: any) => {
                    let books = [];
                    if (Array.isArray(data)) {
                        for (let element of data) {
                            books.push(this.mapToBook(element));
                        }
                    }
                    return books;
                }
            )
    }

    delete(id: string) {
        // call DELETE request and do some stuff
    }

    update(id: string) {
        // call PUT request and do some stuff
    }

    // other CRUD methods
}
``` 

With @genese/angular, you can put this file in the garbage, simply by calling GeneseService inside your components, like this :


Supposing that in your environment.ts, `genese.api = http://localhost:3000` .

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.getOne('/books', '1').subscribe((book: Book) => {
         // book is the data returned by 
         // the request http://localhost:3000/books/1
         // and formatted with type Book
    });
}
```

With the getOne() Genese method, you are sure to receive your data correctly formatted with Book's type. No data-services to write, and no unit tests to do.
Of course, you can use all the classic CRUD methods with Genese, but you can do much more : translate automatically the properties of your objects, paginate automatically lists coming from your getAll() requests, etc.

With Genese, you simply code better and faster.

[Top](#table-of-contents)
## Installation

At first you need to install the npm module:

```sh
npm install angular --save
```

The minimum Angular version is Angular 8.

---

[Top](#table-of-contents) -> [Installation](#installation)
#### 1. Config

Now, you need to configure your environment. Genese needs to know what is the api address of your backend. You can do that by adding `GeneseEnvironmentService` in the constructor of your `AppComponent`.

* Example:

`app.component.ts`
```ts
import { Component } from '@angular/core';
import { GeneseEnvironmentService } from 'angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(geneseEnvironmentService: GeneseEnvironmentService) {
      geneseEnvironmentService.setEnvironment(environment.genese);
  }
}
```

`environment.ts`
```ts
export const environment = {
  production: false,
    genese: {
        api: 'http://localhost:3000'
    }
};
```
(replace the value of the property `api` by your api url)

[Top](#table-of-contents) -> [Installation](#installation)
#### 2. Import Genese module

Import the genese module in the `app.module`.

* Example

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneseModule } from 'angular';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        GeneseModule.forRoot(),

        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```


[Top](#table-of-contents) -> [Installation](#installation)
##### 3. Inject geneseService in your component

Add a property with `Genese` type to your component, inject `GeneseService` in the constructor and instantiate your property with `getGeneseInstance`.

* Example

```ts
import { Book } from './models/book.model.ts';
import { Genese } from 'angular/lib/factories/genese.factory';
import { GeneseService } from 'angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    public booksGenese: Genese<Book>;

    constructor(
        private geneseService: GeneseService,
    ) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }
}
```

[Top](#table-of-contents) 
## Models

Genese needs to be able to find all the properties of your models. That's why it is imperative to set default values to all the properties of your models, including inside nested objects.
Respecting this constraint, Genese will be able to return all the objects correctly formatted.

* ***Optional***

`getOne()` and `getAll()` methods are "cleaner" than `getOneCustom()` and `getAllCustom()` because they hide the path of the endpoints in your components. If you want to use them, you must specify the desired route in the model :

```ts
export class Book = {
    id ?= '';
    name ?= '';
    public genese?: GeneseModelEnvironment = {
        path: '/books'
    };
}
```

* ***Note***

A Genese good practice is to set all the properties of your models as optional. It will be easier to create new objects and will not crash if one day you forget to set a property.

[Top](#table-of-contents) -> [Models](#models)
### Primitives
* Example with primitives

```ts
export class Book = {
    id ?= '';
    codeNumbers: number[] = [0];
    collectionNumber?: 0;
    isAvailable?: true;
    name ?= '';
}
```

[Top](#table-of-contents) -> [Models](#models)
### Nested objects
* Example with nested object

```ts
export class Book = {
    id ?= '';
    public editor?: {
        name?: string,
        place?: {
            city?: string,
            country?: string
        }
    } = {
        name: '',
        place: {
            city: '',
            country: ''
        }
    };
}
```

[Top](#table-of-contents) -> [Models](#models)
### Indexable types

Suppose that you wait http responses like this 
```ts
{
    en: 'The caves of steel',
    fr: 'Les cavernes d\'acier'
}
``` 
and suppose that you don't know in advance how many properties will have your response. In this example, you don't know in advance how many translations you will receive and in which languages.
In this case, you need to use indexable types like this :

```ts
export class Book = {
    [key: string]: string
}
```
This is the simplest example of indexable types.
Now, suppose that your http request returns something more complex like this :

```ts
{
    en: {
        country: 'England',
        name: 'The caves of steel'
    },
    fr: {
        country: 'France',
        name: 'Les cavernes d\'acier'
    }
}
```

In this case, you simply need to define your Genese model like this :
```ts
export class Book = {
    [key: string]: {
        country?: string,
        name?: string
    } = {
        gnIndexableType: {
            country: '',
            name: ''
        }
    }
}
```

The ``gnIndexableType`` key is a special key used by Genese to understand that you wait a response with indexableTypes.
You'll need to use it every time you'll have to use indexable types.

[Top](#table-of-contents) -> [Models](#models)
### Translations

Supposing that you have some fields which are translated in many languages, you'll probably want to have a GET request which will return the object translated in one of these languages. For example, if your data are like this 
```ts
{
    en: {
        country: 'England',
        name: 'The caves of steel'
    },
    fr: {
        country: 'France',
        name: 'Les cavernes d\'acier'
    }
}
```
you may want to receive a response with only the french language, like this :

```ts
{
    country: 'France',
    name: 'Les cavernes d\'acier'
}
```
Genese can do that for you. You will need to use the ``translate()`` method, which is described [here](#translatetdata-t-language-string-t).
To be able to do that, you need to construct your model like this :

```ts
export class Book = {
    gnTranslate: {
        [key: string]: {
            country: string,
            name: string
        }
    } = {
        gnIndexableType: {
            country: '',
            name: ''
        }
    }
}
```
The ``gnTranslate`` key is a specific keyword used by Genese to understand that some fields may be translated.
You'll need to use it every time you'll have to use translations. The usage of ``gnIndexableType`` is described [here](#indexable-types).
You'll find usage informations about `translate()` method [here](#translatedata-any-language-string-any)

[Top](#table-of-contents) 
## Methods

Genese provides many useful methods, like "classic" CRUD operations, but other interesting methods which will help you to translate objects or to map them in the type that you want. 

| method           | Usage          |
| --------------   | -------------- |
| [create()](#create-t-newobject-t-options-requestoptions-observablet--any)                                                                | Sends a POST request to add an object in database. Needs to respect <br>Genese standards.                                                                                              |
| [createCustom()](#createcustom-t-path-string-body-object-options-requestoptions-observablet--any)                                        | Sends a POST request to add an object in database. Possibility to use <br>custom params, without respecting the Genese standards.                                                      |
| [delete()](#delete-t-id-string-observable-responsestatus)                                                                                | Sends a DELETE request to remove an object in database. Needs to <br>respect Genese standards.                                                                                         |
| [deleteCustom()](#deletecustom-t-path-string-options-requestoptions-observable-responsestatus)                                           | Sends a DELETE request to remove an object in database. Possibility to <br>use custom params, without respecting the Genese standards.                                                 |
| [fetch()](#fetch-t-path-string-method-requestmethod-requestinit-requestinit-promise-t)                                                   | Sends a fetch request. Useful if you can't use the HttpClient for one or<br> another reason.                                                                                           |
| [getAll()](#getall-t-params-getallparams-observable-t)                                                                                    | Sends a GET request to get a list of objects from database and to format<br> them with the asked type. Needs to respect Genese standards.                                              |
| [getAllWithPagination()](#getallwithpagination-t-path-string-params-getallwithpaginationparams-observableresults-t-totalresults-number)   | Sends a GET request to get a list of objects from database and to format<br> them with the asked type. Needs to respect Genese standards.                                              |
| [getAllCustom()](#getallcustom-t-path-string-params-getallparams-observablet)                                                            | Sends a GET request to get a list of objects from database and to format<br> them with the asked type. Possibility to use custom params, without <br>respecting the Genese standards.      |
| [getArray()](#getarray-arrayresponse--observable-t)                                                                                      | Sends a GET request to get an array of array of objects from database and to format<br> them with the asked type.                                                                      |
| [getOne()](#getone-t-id-string-observable-t)                                                                                             | Sends a GET request to get an object from database and to format it <br>with the asked type. Needs to respect Genese standards.      |
| [getOneCustom()](#getonecustompath-string-params-getoneparams-observablet)                                                               | Sends a GET request to get an object from database and to format it <br>with the asked type. Possibility to use custom params, without respecting <br>the Genese standards.      |
| [request()](#request-t-path-string-method-requestmethod-options-requestoptions-observablet--any)                                         | Sends a http.request() method, which is permitting you to call api not<br> respecting REST conventions, like using a POST for getting objects.                                         |
| [translate()](#translatedata-any-language-string-any)                                                                                    | Special method used to translate automatically objects which are multi-<br>languages in one of these languages. Needs to respect Genese standards.                                     |
| [update()](#update-t-id-string-updatedobject-t-options-requestoptions-observablet--any)                                                  | Sends a PUT request to update an object in database. Needs to respect <br>Genese standards.                                                                                            |
| [updateCustom()](#updatecustom-t-path-string-body-object-options-requestoptions-observablet--any)                                        | Sends a PUT request to update an object in database. Possibility to use <br>custom params, without respecting the Genese standards.                                                    |

[Top](#table-of-contents) -> [Methods](#methods)
### create< T >(newObject: T, options?: RequestOptions): Observable<T | any>

create() sends a POST request to add a T object in database and returns an Observable with the object created formatted with the T type.

If the endpoint respects the Genese standards, it should return the new object. In this case, the create() method will return this object formatted with the T type. In the other case, the create() method will simply return the request response.

create() method needs that your app respects the Genese standards :

* You must add a genese param to your model like this :
```ts
{
  "genese": {
    "path": "/books"
  }
}
```
* The endpoint must wait a POST method.

* The api path must respect the REST api standards for a POST method (example : http://my-path/book)

**Usage**

Supposing that in your environment.ts, genese.api = http://localhost:3000`


``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
    genese?: GeneseModelEnvironment = {
        path: '/books'
    }
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    const book: Book = {
        id: '1',
        name: 'The caves of steel'
    }

    this.booksGenese.create(book).subscribe((newBook: Book) => {
         // newBook is the object returned by 
         // the POST request http://localhost:3000/book
         // and formatted with type Book
    });
}
```

* Note

The `create()` method supposes that the backend returns data corresponding to the new book object, which will be converted to Book type by Genese. If the backend returns something else and that you just want to get the data without formatting them with T type, you can simply set the property `mapData` to false in the `options` param.

``books.component.ts``
```ts
    this.booksGenese.create('/books', book, {mapData: false}).subscribe((newBook: Book) => {
         // newBook is the object returned by 
         // the POST request http://localhost:3000/books
         // and formatted with type Book
    });
```






[Top](#table-of-contents) -> [Methods](#methods)
### createCustom< T >(path: string, body?: object, options?: RequestOptions): Observable<T | any>

Same as [create()](#create-t-newobject-t-options-requestoptions-observablet--any), but Contrary to create() method, you can use a custom api path and you don't need to parameter your model with a genese property. Moreover, the parameter "body" can be any object : you don't need to use a body with T type.
                                                       
The backend must wait a POST http request.

**Usage**

Supposing that in your environment.ts, genese.api = http://localhost:3000`


``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    const book: any = {
        id: '1',
        name: 'The caves of steel',
        foo: 'bar'
    }

    this.booksGenese.createCustom('/books', book).subscribe((newBook: Book) => {
         // newBook is the object returned by 
         // the POST request http://localhost:3000/books
         // and formatted with type Book
    });
}
```

* Note

The `createCustom()` method supposes that the backend returns data corresponding to the new book object, which will be converted to Book type by Genese. If the backend returns something else and that you just want to get the data without formatting them with T type, you can simply set the property `mapData` to false in the `options` param.

``books.component.ts``
```ts
    this.booksGenese.create('/custom-books-path', book, {mapData: false}).subscribe((newBook: Book) => {
         // newBook is the object returned by 
         // the POST request http://localhost:3000/custom-books-path
         // and formatted with type Book
    });
```






 
[Top](#table-of-contents) -> [Methods](#methods)
 ### delete< T >(id: string): Observable< ResponseStatus>
 
 This method is used to remove an object in database with a DELETE http request and returns a `ResponseStatus`, which is equal to `FAILED` or `SUCCESS`.
 
 delete() method needs that your app respects the Genese standards :
 
 * You must add a genese param to your model like this :
 
```ts
{
  "genese": {
    "path": "/books"
  }
}
```

 * The endpoint must wait a DELETE method.
 
 * The api path must respect the REST api standards for a create() method, like this : ``http://my-path/book/id``
 
**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000`

``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
    genese?: GeneseModelEnvironment = {
        path: '/books'
    }
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.delete('1').subscribe((response: ResponseStatus) => {
         // send the DELETE request http://localhost:3000/books/1
         // and returns 'SUCCESS' if the property 'ok' of the DELETE http response is equal to true, and 'FAILED' if not.
    });
}
```






 
[Top](#table-of-contents) -> [Methods](#methods)
 ### deleteCustom< T >(path: string, options?: RequestOptions): Observable< ResponseStatus>
 
 
Same as [delete()](#delete-t-id-string-observable-responsestatus-), but contrary to create() method, you can use a custom api path and you don't need to parameter your model with a genese property.
                                                       
The backend must wait a DELETE http request.
 
**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000`


``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.deleteCustom('/custom-books-path', '1').subscribe((response: ResponseStatus) => {
         // send the DELETE request http://localhost:3000/custom-books-path/1
         // and returns 'FAILED' if the property 'ok' of the DELETE http response is equal to true, and 'SUCCESS' if not.
    });
}
```








[Top](#table-of-contents) -> [Methods](#methods)
### fetch< T >(path: string, method: RequestMethod, requestInit?: RequestInit): Promise< T>

If for one or another reason you can't use the Angular HttpClient but you're able to use `fetch` requests, you should use Genese `fetch()`method, which will send a `fetch` request and return a formatted object with the asked type.

**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000`

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.fetch('/custom-books-path/1', 'get').subscribe((book: Book) => {
         // sends the fetch GET request http://localhost:3000/custom-books-path/1
         // and returns data object formatted with the type Book.
    });
}
```
 





[Top](#table-of-contents) -> [Methods](#methods)
### getAll< T >(params?: GetAllParams): Observable< T[]>

This method is used to receive a list of objects with T type, without pagination.
This method is used to get a list of T objects from http GET request and to format them with T type, without pagination.

getAll() method needs that your app respects the Genese standards :

* You must add a genese param to your model like this :
```ts
{
  "genese": {
    "path": "/books"
  }
}
```
* The http request must be a GET method

* The api path must respect the REST api standards for a getAll() method, like this : ``http://my-path/books``

Supposing that your http GET request returns a simple list of objects, without pagination, the response will probably be like this:
```ts
[
    {
        id: '1',
        name: 'The caves of steel'
    },
    {
        id: '2',
        name: 'The robots of dawn'
    },
]
```
In this case, the ``getAll()`` method returns an observable of array of Book, formatted with Book type. In this example, this method will return an array with two objects ``[Book, Book]``.

**Usage**

Supposing that in your environment.ts, ``genese.api = http://localhost:3000``

``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
    genese?: GeneseModelEnvironment = {
        path: '/books'
    }
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.getAll().subscribe((books: Book[]) => {
         // books is the array of data returned by 
         // the GET request http://localhost:3000/books
         // and formatted with type Book
    });
}
```
* Filters

You can add some filters to your http request very simply, just like this :

```ts
    this.booksGenese.getAll({author: 'Isaac Asimov'}).subscribe((books: Book[]) => {
         // books is the array of data returned by 
         // the GET request http://localhost:3000/books?author=Isaac%20Asimov
         // and formatted with type Book
    });
}
```






[Top](#table-of-contents) -> [Methods](#methods)
### getAllCustom< T >(path: string, params?: GetAllParams): Observable<T[]>

As getAll() method, getAllCustom() is used to get a list of objects from http GET request and to format them with T type.

But contrary to getAll() method, you can use a custom api path and you don't need to parameter your model with a genese property.

The backend must wait a GET http request.

**Usage**

Supposing that in your environment.ts, ``genese.api = http://localhost:3000``

``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.getAllCustom('/books').subscribe((books: Book[]) => {
         // books is the array of data returned by 
         // the GET request http://localhost:3000/books
         // and formatted with type Book
    });
}
```
* Filters

You can add some filters to your http request very simply, just like this :

```ts
    this.booksGenese.getAllCustom('/custom-books-path', {author: 'Isaac Asimov'}).subscribe((books: Book[]) => {
         // books is the array of data returned by 
         // the GET request http://localhost:3000/custom-books-path?author=Isaac%20Asimov
         // and formatted with type Book
    });
}
```






[Top](#table-of-contents) -> [Methods](#methods)
### getAllWithPagination< T >(path: string, params: GetAllWithPaginationParams): Observable<{results: T[], totalResults: number}>

Suppose that you want to display a list of books which are in your library, and that you want to paginate it with a page size of 5 elements. Suppose too that you have 231 books in your library, and that you want to display the third page of your list (so pageIndex = 2).
Usually, you would send a GET request like this :

```ts
    http://localhost:3000/books?pIndex=2&pSize=5
```

and the http response would probably be like this :

```ts
{
    data: [
        {
            id: '10',
            name: 'The caves of steel'
        },
        {
            id: '11',
            name: 'The robots of dawn'
        },
        {
            id: '12',
            name: 'Robots and Empire'
        },
        {
            id: '13',
            name: 'The Currents of Space'
        },
        {
            id: '14',
            name: 'The Stars'
        }
    ],
    totalData: 231
}
```

The Genese method ``getAllWithPagination()`` is able to return very simply this kind of paginated list and in same time to format each element with type "Book".
You will just need to call this method like this :

`books.component.ts`
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.getAllWithPagination('/books', {pageIndex: 2, pageSize: 5}).subscribe((response: { totalResults: number, results: Book[]) => {
         // The GET request called is http://localhost:3000/books?pIndex=2&pSize=4
         // In this case, totalResults = 231 and results is an array of 5 books, typed with the Book model.
    });
}
```

For that, you need at first to configure your Genese environment by specifying the pagination parameters.

`environment.ts`
```ts
export const environment = {
    genese: {
        api: 'http://localhost:3000',   // The url of your API
        pagination: {
            pageIndex: 'pIndex',        // pIndex is the param's name used by the backend designating the index of the current page
            pageSize: 'pSize',          // pSize is the param's name used by the backend designating the  number of elements of each page
            results: 'data',            // data is the name of the property returned by the backend with the array of objects to map
            totalResults: 'totalData'   // totalData is the number of all the objects of the list
        }
    }
};
```






[Top](#table-of-contents) -> [Methods](#methods)
### getArray< ArrayResponse >(): Observable< T[]>


`getArray()` method is used with GET http requests which are returning array of arrays of objects, like `[[Book]]`.

This method needs that your app respects the Genese standards.

* You must add a genese param to your model to specify the endpoint's path.

* Your model must implement the ArrayResponse interface, which implies to add a specific genese param "gnArrayResponse" to indicate to Genese that you're waiting an array of arrays :

* The endpoint must wait a GET method.

* The api path must respect the REST api standards for a GET method (example : http://my-path/array-of-arrays-of-books)

**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000` .

``array-of-array-of-books.model.ts`` 
```ts
export class ArrayOfArraysOfBooks implements ArrayResponse {
    gnArrayResponse?: Book[][] = [[new Book()]];
    public genese?: GeneseModelEnvironment = {
        path: '/array-response/array-of-arrays-of-books'
    };
}
```

``array-of-array-of-books.component.ts``
```ts
export class ArrayOfArrayOfBooksComponent {

    public arrayOfArraysOfBooksGenese: Genese<ArrayOfArraysOfBooks>;

    constructor(private geneseService: GeneseService) {
        this.arrayOfArraysOfBooksGenese = geneseService.getGeneseInstance(ArrayOfArraysOfBooks);
    }

    this.arrayOfArraysOfBooksGenese.getArray().subscribe((arrayOfArraysOfBooks: Book[][]) => {
         // arrayOfArraysOfBooks is the value of the property gnArrayResponse of the data 
         // returned by the request http://localhost:3000/books/1
         // and formatted with type Book[][]
    });
}
```

***CAUTION :***

The getArray() method doesn't return an ArrayOfArraysOfBooks object, but the content of the gnArrayResponse property, ie a Book[][] object.







[Top](#table-of-contents) -> [Methods](#methods)
### getOne< T >(id: string): Observable< T>

This method is used to get a T object in database with a GET http request. The returned object is mapped with the T type, which is given by the type of your `GeneseService`.

This method needs that your app respects the Genese standards :

* You must add a genese param to your model like this :
```ts
[
    {
        id: '1',
        name: 'The caves of steel'
    },
    {
        id: '2',
        name: 'The robots of dawn'
    },
]
```
* The endpoint must wait a GET method.

* The api path must respect the REST api standards for a GET method (example : ``http://my-path/book/id``)

**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000` .

``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
    genese?: GeneseModelEnvironment = {
        path: '/books'
    }
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.getOne('1').subscribe((book: Book) => {
         // book is the data returned by 
         // the request http://localhost:3000/books/1
         // and formatted with type Book
    });
}
```





[Top](#table-of-contents) -> [Methods](#methods)
### getOneCustom(path: string, params?: GetOneParams): Observable<T>

getOneCustom() method is used to get a T object in database with a GET http request. The returned object is mapped with the T type, which is given by the type of your `GeneseService`.

Contrary to getOne() method, you can use a custom api path and you don't need to parameter your model with a genese property. Moreover, you can add some params, like query params.

The backend must wait a GET http request.

**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000` .

``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.getOne('/custom-books-path','1').subscribe((book: Book) => {
         // book is the data returned by 
         // the request http://localhost:3000/custom-books-path/1
         // and formatted with type Book
    });
}
```








[Top](#table-of-contents) -> [Methods](#methods)
### request< T >(path: string, method: RequestMethod, options?: RequestOptions): Observable<T | any>

It can happens, for one or another reason, that your endpoints are not respecting REST standards. If you can't modify the backend's code, it can be problematic, especially when the http actions of the endpoints are not the real actions that they should do. As example, it can happens that your GET or DELETE methods are done with POST requests. It is a bad practice, but sometimes you don't have any choice. In this case, usual Genese CRUD methods are difficult to use. As example, the `getOne()` Genese method will send a GET request; if the backend is waiting a POST request, the `getOne()` method will crash. 

To solve this problem, you can use the Genese method `request()`, which is using the Angular HttpClient method `request`, which is able to take in parameter the action verb of the http request. In one word, you'll can send a GET request using the POST action verb.

**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000`

``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.request('/books/1', 'post').subscribe((book: Book) => {
        // this method sends the POST request http://localhost:3000/books/1
        // and returns the data returned by the backend
        // By default, these data will be formatted in type Book
        // If you want to receive the data without any formatting, just set the property mapData of the options param to false.
    });
}
```






[Top](#table-of-contents) -> [Methods](#methods)
### translate(data: any, language: string): any

This methods translates data containing properties with translated in many languages into data containing these properties translated in one of these languages. These data must respect Genese standard formats which are more detailed [here](#translations).
The `translate()` method is generally used in combination with other Genese CRUD methods, like this : 

**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000`

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    this.booksGenese.getOne('/books', '1').subscribe((book: Book) => {
        const translatedBook = this.booksGenese.translate(book, 'fr');
        return translatedBook;
         // translatedBook is the data returned by 
         // the GET request http://localhost:3000/books/1
         // and with translatable fields translated in french
    });
}
```

For example, if the Book model is like this :

``book.model.ts``
```ts
export class Book = {
    gnTranslate: {
        [key: string]: {
            country: string,
            name: string
        }
    } = {
        gnIndexableType: {
            country: '',
            name: ''
        }
    }
}
```

and if the data returned by the GET request are 
```ts
{
    en: {
        country: 'England',
        name: 'The caves of steel'
    },
    fr: {
        country: 'France',
        name: 'Les cavernes d\'acier'
    }
}
```
the result of the previous request will be :

```ts
{
    country: 'France',
    name: 'Les cavernes d\'acier'
}
```

``gnTranslated`` and ``gnIndexableType`` are specific Genese keywords, described more in detail [here](#translations) and [here](#indexable-types).








[Top](#table-of-contents) -> [Methods](#methods)
### update< T >(id: string, updatedObject: T, options?: RequestOptions): Observable<T | any>

This method sends a PUT request updating a T object in database with a PUT http request and returns the updated object formatted with T type.

update() method needs that your app respects the Genese standards :

* You must add a genese param to your model like this :
```ts
{
  "genese": {
    "path": "/books"
  }
}
``` 
* The endpoint must wait a PUT method.

* The api path must respect the REST api standards for a PUT method (example : http://my-path/books/id)

**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000`

``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
    genese?: GeneseModelEnvironment = {
        path: '/books'
    }
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    const updatedBook: Book = {
        id: '1',
        name: 'The caves of steel'
        author: 'Isaac Asimov'
    }

    this.booksGenese.update('1', updatedBook).subscribe((book: Book) => {
         // book is the data returned by 
         // the PUT request http://localhost:3000/books/1
         // and formatted with type Book
    });
}
```

* Note

The `update()` method supposes that the backend returns data corresponding to the new book object, which will be converted to Book type by Genese. If the backend returns something else and that you just want to get the data without formatting them with T type, you can simply set the property `mapData` to false in the `options` param.










[Top](#table-of-contents) -> [Methods](#methods)
### updateCustom< T >(path: string, body?: object, options?: RequestOptions): Observable<T | any> 

updateCustom() method is used to update a T object in database with a PUT http request and returns a response with ResponseStatus type.

Contrary to update() method, you can use a custom api path and you don't need to parameter your model with a genese property.

However, the backend must wait a PUT http request.

**Usage**

Supposing that in your environment.ts, `genese.api = http://localhost:3000`

``book.model.ts`` 
```ts
export class Book {
    id ?= '';
    name ?= '';
}
```

``books.component.ts``
```ts
export class BooksComponent {

    public booksGenese: Genese<Book>;

    constructor(private geneseService: GeneseService) {
        this.booksGenese = geneseService.getGeneseInstance(Book);
    }

    const updatedBook: Book = {
        id: '1',
        name: 'The caves of steel'
        author: 'Isaac Asimov'
    }

    this.booksGenese.update('/custom-books-path/1', updatedBook).subscribe((book: Book) => {
         // book is the data returned by 
         // the PUT request http://localhost:3000/custom-books-path/1
         // and formatted with type Book
    });
}
```

* Note

The `updateCustom()` method supposes that the backend returns data corresponding to the new book object, which will be converted to Book type by Genese. If the backend returns something else and that you just want to get the data without formatting them with T type, you can simply set the property `mapData` to false in the `options` param.


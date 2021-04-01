import { Injectable, ɵɵdefineInjectable, Component, NgModule } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { __awaiter } from 'tslib';
import { GeneseMapper } from 'genese-mapper';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

// @dynamic
class Tools {
    constructor() { }
    /**
     * clone object with deep copy
     */
    static clone(model) {
        if (model) {
            if (Array.isArray(model)) {
                const newArray = [];
                model.forEach(item => newArray.push(this.clone(item)));
                return newArray;
            }
            else if (typeof model === 'object') {
                const newObject = {};
                Object.keys(model).forEach(key => newObject[key] = this.clone(model[key]));
                return newObject;
            }
            else {
                return model;
            }
        }
        else {
            return model;
        }
    }
    /**
     * Check if an object is a primitive or not
     */
    static isPrimitive(target) {
        return typeof target === 'string'
            || typeof target === 'number'
            || typeof target === 'boolean';
    }
    /**
     * Returns a value by default if value to check doesn't exists
     */
    static default(valueToCheck, valueByDefault) {
        return valueToCheck ? valueToCheck : valueByDefault;
    }
    /**
     * Check if two objects have the same values for every key
     */
    static isSameObject(obj1, obj2) {
        if (obj1 === obj2) {
            return true;
        }
        if (typeof obj1 === 'number' && obj1.toString() === obj2.toString()) {
            return true;
        }
        if ((obj1 === undefined || obj2 === undefined)
            || (Array.isArray(obj1) && !Array.isArray(obj2))
            || (!Array.isArray(obj1) && Array.isArray(obj2))
            || (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length !== obj2.length)) {
            return false;
        }
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            let index = 0;
            for (const element of obj1) {
                if (!this.isSameObject(element, obj2[index])) {
                    return false;
                }
                index++;
            }
            return true;
        }
        else {
            for (const key of Object.keys(obj1)) {
                if ((!obj2[key] && !!obj1[key]) || (!!obj2[key] && !obj1[key])) {
                    return false;
                }
                if (Array.isArray(obj1[key])) {
                    if (!this.isSameObject(obj1[key], obj2[key])) {
                        return false;
                    }
                }
                else {
                    if (typeof obj1[key] === 'object') {
                        if (!this.isSameObject(obj1[key], obj2[key])) {
                            return false;
                        }
                    }
                    else {
                        if (obj1[key] && obj2[key] && obj1[key].toString() !== obj2[key].toString()) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
    // --------------------------------------------------
    //                  REQUEST METHODS
    // --------------------------------------------------
    static isPath(str) {
        return /^\/[-a-zA-Z0-9@:%.{}_+~#=]?/.test(str);
    }
    /**
     * Get the root path of the api
     */
    static apiRoot(rootApi, path, id) {
        const url = path ? rootApi + path : rootApi;
        return id ? `${url}/${id}` : url;
    }
    /**
     * Check if the id is correct
     */
    static checkId(id) {
        if (!id || !(+id > 0)) {
            throw Error('Incorrect Genese id.');
        }
    }
    /**
     * Check if the path is correct
     */
    static checkPath(path) {
        if (!path || typeof path !== 'string') {
            throw Error('Incorrect Genese path.');
        }
    }
}
Tools.decorators = [
    { type: Injectable }
];
Tools.ctorParameters = () => [];

class GeneseEnvironmentService {
    constructor() { }
    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------
    /**
     * Configure Genese environment
     */
    setEnvironment(config) {
        if (config) {
            this.api = Tools.default(config.api, 'http://localhost:3000');
            this.extract = Tools.default(config.extract, 'gnExtract');
            if (config.pagination) {
                this.pageIndex = Tools.default(config.pagination.pageIndex, 'gnPageIndex');
                this.pageSize = Tools.default(config.pagination.pageSize, 'gnPageSize');
                this.results = Tools.default(config.pagination.results, 'gnPageResults');
                this.totalResults = Tools.default(config.pagination.totalResults, 'gnPageTotalResults');
            }
        }
    }
}
GeneseEnvironmentService.decorators = [
    { type: Injectable }
];
GeneseEnvironmentService.ctorParameters = () => [];

var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["FAILED"] = "FAILED";
    ResponseStatus["SUCCESS"] = "SUCCESS";
})(ResponseStatus || (ResponseStatus = {}));

var RequestMethod;
(function (RequestMethod) {
    RequestMethod["DELETE"] = "delete";
    RequestMethod["GET"] = "get";
    RequestMethod["PATCH"] = "patch";
    RequestMethod["POST"] = "post";
    RequestMethod["PUT"] = "put";
})(RequestMethod || (RequestMethod = {}));

class Genese {
    constructor(http, geneseEnvironment, tConstructor) {
        this.http = http;
        this.geneseEnvironment = geneseEnvironment;
        this.tConstructor = tConstructor;
        this.geneseMapperService = new GeneseMapper(tConstructor);
    }
    // --------------------------------------------------
    //                   CRUD METHODS
    // --------------------------------------------------
    /**
     * Creates an object and return an Observable of the created object with T type
     * @deprecated since 1.2.0. Please use post() method instead
     */
    create(newObject, options) {
        this.checkTType(newObject);
        return this.http.post(this.apiRoot(this.getStandardPath()), newObject, this.getRequestOptions(options))
            .pipe(map((result) => {
            if (options && options.mapData === false) {
                return result;
            }
            else {
                return this.geneseMapperService.map(result);
            }
        }));
    }
    /**
     * Creates an object and return an Observable of the created object with T type
     * @deprecated since 1.2.0. Please use post() method instead
     */
    createCustom(path, body, options) {
        this.checkPath(path);
        body = Tools.default(body, {});
        return this.http.post(this.apiRoot(path), body, this.getRequestOptions(options))
            .pipe(map((result) => {
            if (options && options.mapData === false) {
                return result;
            }
            else {
                return this.geneseMapperService.map(result);
            }
        }));
    }
    /**
     * Deletes an element and returns success or failed status.
     * This method needs to respect Genese standard model
     */
    delete(id) {
        this.checkId(id);
        return this.http.delete(`${this.apiRoot(this.getStandardPath())}/${id}`, { observe: 'response' })
            .pipe(map((response) => {
            return response && response.ok === true ? ResponseStatus.SUCCESS : ResponseStatus.FAILED;
        }));
    }
    /**
     * Delete an element and returns success or failed status.
     * This method can be used with custom params.
     */
    deleteCustom(path, options) {
        this.checkPath(path);
        const url = this.apiRoot(path);
        options = Tools.default(options, {});
        Object.assign(options, { observe: 'response' });
        return this.http.delete(url, options)
            .pipe(map((response) => {
            return response && response.ok === true ? ResponseStatus.SUCCESS : ResponseStatus.FAILED;
        }));
    }
    /**
     * Returns mapped object using fetch method
     */
    fetch(path, method, requestInit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!method || !path) {
                console.error('Incorrect parameters : impossible to send request');
                return Promise.reject('Incorrect parameters : impossible to send request');
            }
            const url = this.apiRoot(path);
            const response = yield fetch(url, requestInit);
            const data = yield response.clone().json();
            if (method === RequestMethod.DELETE) {
                return this.geneseMapperService.map(data ? data.body : undefined);
            }
            else {
                return this.geneseMapperService.map(data);
            }
        });
    }
    /**
     * Get all elements of array of data returned by GET request and map them with T type
     */
    getAll(params) {
        let httpParams = new HttpParams();
        if (params && params.filters) {
            for (const key of Object.keys(params.filters)) {
                if (params.filters[key]) {
                    httpParams = httpParams.set(key, params.filters[key].toString());
                }
            }
        }
        const options = { params: httpParams };
        const url = this.apiRoot(this.getStandardPath());
        return this.http.get(url, options).pipe(map((response) => {
            return response ? this.geneseMapperService.arrayMap(response) : [];
        }));
    }
    /**
     * Get all elements of array of data returned by GET request and map them with T type
     * If you want specific HttpParams you should to declare them in the second parameter because
     * they have priority over RequestOptions
     */
    getAllCustom(path, params, requestOptions) {
        if (!path) {
            console.error('No path : impossible to get elements');
            return of(undefined);
        }
        let httpParams = new HttpParams();
        if (requestOptions && requestOptions.params) {
            for (const key of Object.keys(requestOptions.params)) {
                if (requestOptions.params[key]) {
                    httpParams = httpParams.set(key, requestOptions.params[key].toString());
                }
            }
            delete requestOptions.params;
        }
        if (params && params.filters) {
            for (const key of Object.keys(params.filters)) {
                if (params.filters[key]) {
                    httpParams = httpParams.set(key, params.filters[key].toString());
                }
            }
        }
        const allOptions = Object.assign({}, { params: httpParams }, requestOptions);
        const url = this.apiRoot(path);
        return this.http.get(url, allOptions).pipe(map((response) => {
            return response ? this.geneseMapperService.arrayMap(response) : [];
        }));
    }
    /**
     * Get all elements with pagination
     * If the http response have paginated format, it returns paginated response with this format :
     * {
     *      totalResults?: number;
     *      results: T[];
     * }
     */
    getAllWithPagination(path, params) {
        if (!path) {
            console.error('No path : impossible to get paginated elements');
            return of(undefined);
        }
        if (!params || !params.pageSize) {
            console.error('Incorrect parameters : impossible to get paginated elements. The parameter pageSize must be defined.');
            return of(undefined);
        }
        let httpParams = new HttpParams();
        if (params) {
            if (params.pageIndex !== undefined) {
                httpParams = httpParams.set(this.geneseEnvironment.pageIndex, params.pageIndex.toString());
            }
            if (params.pageSize !== undefined) {
                httpParams = httpParams.set(this.geneseEnvironment.pageSize, params.pageSize.toString());
            }
            if (params.filters) {
                for (const key of Object.keys(params.filters)) {
                    if (params.filters[key]) {
                        httpParams = httpParams.set(key, params.filters[key].toString());
                    }
                }
            }
        }
        const options = { params: httpParams };
        const url = this.apiRoot(path);
        return this.http.get(url, options).pipe(map((response) => {
            if (response && this.isPaginatedResponse(response)) {
                return {
                    results: this.geneseMapperService.arrayMap(response[this.geneseEnvironment.results]),
                    totalResults: response[this.geneseEnvironment.totalResults]
                };
            }
            else {
                console.error('Response is not paginated. ' +
                    'Please verify that the response includes an array corresponding to your Genese pagination environment.');
                return undefined;
            }
        }));
    }
    /**
     * This method must be called when the http response is not an object, but an array (for example : ['a', 'b'])
     * The DTO model must implement the ArrayResponse interface
     *
     * Example :
     * MyModel {
     *     gnArrayResponse: [{
     *         id: '',
     *         name: ''
     *     }]
     * }
     * The getArray method will return the response array with the correct format
     */
    getArray() {
        this.checkIfTTypeIsArrayResponseType();
        const url = this.apiRoot(this.getStandardPath());
        return this.http.get(url)
            .pipe(map((data) => {
            const tObject = {
                gnArrayResponse: data
            };
            return this.geneseMapperService.map(tObject) ? this.geneseMapperService.map(tObject)['gnArrayResponse'] : undefined;
        }));
    }
    /**
     * Get one element of the T class (or the U class if the uConstructor param is defined)
     */
    getOne(id) {
        this.checkId(id);
        const url = this.apiRoot(this.getStandardPath(), id);
        return this.http.get(url)
            .pipe(map((data) => {
            return this.geneseMapperService.map(data);
        }));
    }
    /**
     * Get one element of the T class (or the U class if the uConstructor param is defined)
     */
    getOneCustom(path, params) {
        this.checkPath(path);
        let httpParams = new HttpParams();
        if (params) {
            if (params.filters) {
                for (const key of Object.keys(params.filters)) {
                    if (params.filters[key]) {
                        httpParams = httpParams.set(key, params.filters[key].toString());
                    }
                }
            }
        }
        const options = { params: httpParams };
        const url = this.apiRoot(path);
        return this.http.get(url, options)
            .pipe(map((data) => {
            return this.geneseMapperService.map(data);
        }));
    }
    /**
     * Get one element of the T class (or the U class if the uConstructor param is defined)
     */
    request(path, method, options) {
        this.checkPath(path);
        if (!method) {
            throw Error('Incorrect Genese method : impossible to send request');
        }
        options = Tools.default(options, {});
        if (!options.headers
            && (method === RequestMethod.POST || method === RequestMethod.PUT || method === RequestMethod.PATCH)) {
            options.headers = { 'Content-Type': 'application/json' };
        }
        if (!options.observe && method === RequestMethod.DELETE) {
            options.observe = 'response';
        }
        const url = this.apiRoot(path, options.id);
        return this.http.request(method, url, options)
            .pipe(map((result) => {
            if (method === RequestMethod.DELETE) {
                if (options && options.mapData === false) {
                    return result;
                }
                else {
                    return this.geneseMapperService.map(result ? result.body : undefined);
                }
            }
            else {
                if (options && options.mapData === false) {
                    return result;
                }
                else {
                    return this.geneseMapperService.map(result);
                }
            }
        }));
    }
    /**
     * Update an element with T type
     * @deprecated since 1.2.0. Please use put() method instead
     */
    update(id, updatedObject, options) {
        this.checkId(id);
        this.checkTType(updatedObject);
        options = Object.assign(this.getRequestOptions(options), { observe: 'body' });
        return this.http.put(this.apiRoot(this.getStandardPath()), updatedObject, options)
            .pipe(map(result => {
            if (options && options.mapData === false) {
                return result;
            }
            else {
                return this.geneseMapperService.map(result);
            }
        }));
    }
    /**
     * Update an element with T type
     * @deprecated since 1.2.0. Please use put() method instead
     */
    updateCustom(path, body, options) {
        this.checkPath(path);
        body = Tools.default(body, {});
        options = Object.assign(this.getRequestOptions(options), { observe: 'body' });
        return this.http.put(this.apiRoot(path), body, options)
            .pipe(map(result => {
            if (options && options.mapData === false) {
                return result;
            }
            else {
                return this.geneseMapperService.map(result);
            }
        }));
    }
    // --------------------------------------------------
    //                   OTHER METHODS
    // --------------------------------------------------
    /**
     * Get the root path of the api
     */
    apiRoot(path, id) {
        const url = path ? this.geneseEnvironment.api + path : this.geneseEnvironment.api;
        return id ? `${url}/${id}` : url;
    }
    /**
     * Check if the id is correct
     */
    checkId(id) {
        if (!id || !(+id > 0)) {
            throw Error('Incorrect Genese id.');
        }
    }
    /**
     * Check if the type T implements the ArrayResponse interface.
     */
    checkIfTTypeIsArrayResponseType() {
        const tObject = new this.tConstructor();
        if (!tObject['gnArrayResponse']) {
            throw Error('The model must contain the gnArrayResponse property.');
        }
    }
    /**
     * Check if the path is correct
     */
    checkPath(path) {
        if (!path || typeof path !== 'string') {
            throw Error('Incorrect Genese path.');
        }
    }
    /**
     * Check if the path is correct
     */
    // TODO : check nested keys
    checkTType(newObject) {
        if (!newObject) {
            throw Error('Genese : there is no T object.');
        }
        if (newObject === {}) {
            throw Error('Genese : empty object.');
        }
        if (Array.isArray(newObject)) {
            throw Error('Genese : an array is not a T object.');
        }
        const tObject = new this.tConstructor();
        Object.keys(newObject).forEach(key => {
            if (!tObject.hasOwnProperty(key)) {
                throw Error('Genese : the object is not a T object');
            }
        });
    }
    /**
     * Get request options of the http request
     */
    getRequestOptions(options) {
        options = Tools.default(options, {});
        options.headers = Tools.default(options.headers, { 'Content-Type': 'application/json' });
        return Object.assign(options, { observe: 'body' });
    }
    /**
     * Check if the response is paginated
     */
    isPaginatedResponse(data) {
        return data && Array.isArray(data[this.geneseEnvironment.results]);
    }
    /**
     * Get standard path when Genese model contains genese.path
     */
    getStandardPath() {
        const model = new this.geneseMapperService.tConstructor();
        if (!model['genese'] || !model['genese'].path) {
            throw Error('No Genese path environment for the model  : impossible to get element.');
        }
        else {
            return model['genese'].path;
        }
    }
    /**
     * Translate data for a given language
     */
    translate(data, language) {
        if (!language) {
            console.error('No data or no language : impossible to get element');
            return undefined;
        }
        else {
            return this.geneseMapperService.translate(data, language);
        }
    }
}

class GeneseAngular {
    constructor(http, geneseEnvironmentService, tConstructor, uConstructor) {
        this.http = http;
        this.tConstructor = tConstructor;
        this.uConstructor = uConstructor;
        this.geneseMapperServiceT = tConstructor ? new GeneseMapper(tConstructor) : undefined;
        this.geneseMapperServiceU = uConstructor ? new GeneseMapper(uConstructor) : undefined;
        this.geneseEnvironmentService = geneseEnvironmentService;
    }
    /**
     * Deletes an element and returns success or failed status.
     * This method needs to respect Genese standard model
     */
    delete(path, options = {}) {
        Tools.checkPath(path);
        const url = Tools.apiRoot(this.geneseEnvironmentService.api, path);
        Object.assign(options, { observe: 'response' });
        return this.http.delete(url, options)
            .pipe(map((response) => {
            if (this.tConstructor) {
                return this.geneseMapperServiceT.map(response);
            }
            else {
                return response && response.ok === true ? ResponseStatus.SUCCESS : ResponseStatus.FAILED;
            }
        }));
    }
    /**
     * Calls a GET request in order to get all elements of an array and to map them with T[] type
     * @param path              the route of the endpoint
     * @param requestOptions    the options of the request
     */
    getAll(path, requestOptions) {
        if (!path) {
            console.error('No path : impossible to get elements');
            return of(undefined);
        }
        let httpParams = new HttpParams();
        if (requestOptions && requestOptions.queryParams) {
            for (const key of Object.keys(requestOptions.queryParams)) {
                if (requestOptions.queryParams[key]) {
                    httpParams = httpParams.set(key, requestOptions.queryParams[key].toString());
                }
            }
            delete requestOptions.queryParams;
        }
        const allOptions = Object.assign({}, { params: httpParams }, requestOptions);
        const url = Tools.apiRoot(this.geneseEnvironmentService.api, path);
        return this.http.get(url, allOptions).pipe(map((response) => {
            return response ? this.geneseMapperServiceT.arrayMap(response) : [];
        }));
    }
    /**
     * Calls GET request and returns an object with T type
     * Warning : do not use this method in order to return an array. Use getAll() method instead.
     * @param path              the route of the endpoint
     * @param requestOptions    the options of the request
     */
    get(path, requestOptions) {
        Tools.checkPath(path);
        let httpParams = new HttpParams();
        if (requestOptions) {
            if (requestOptions.queryParams) {
                for (const key of Object.keys(requestOptions.queryParams)) {
                    if (requestOptions.queryParams[key]) {
                        httpParams = httpParams.set(key, requestOptions.queryParams[key].toString());
                    }
                }
            }
        }
        const options = { params: httpParams };
        const url = Tools.apiRoot(this.geneseEnvironmentService.api, path);
        return this.http.get(url, options)
            .pipe(map((data) => {
            return this.geneseMapperServiceT.map(data);
        }));
    }
    /**
     * Calls PATCH request and returns eventually a response
     * @param path          the route of the endpoint
     * @param body          the body of the request
     * @param options       the options of the request
     */
    patch(path, body, options) {
        return this.crud('patch', path, body, options);
    }
    /**
     * Calls POST request and returns eventually a response
     * @param path          the route of the endpoint
     * @param body          the body of the request
     * @param options       the options of the request
     */
    post(path, body, options) {
        return this.crud('post', path, body, options);
    }
    /**
     * Calls PUT request and returns eventually a response
     * @param path          the route of the endpoint
     * @param body          the body of the request
     * @param options       the options of the request
     */
    put(path, body, options) {
        return this.crud('put', path, body, options);
    }
    /**
     * Experimental method
     */
    crud(requestMethod, path, body, options) {
        return this.http[requestMethod](Tools.apiRoot(this.geneseEnvironmentService.api, path), body, this.getRequestOptions(options))
            .pipe(map((result) => {
            if (this.tConstructor) {
                return this.geneseMapperServiceT.map(result);
            }
            else {
                return result;
            }
        }));
    }
    // --------------------------------------------------
    //                   OTHER METHODS
    // --------------------------------------------------
    /**
     * Get request options of the http request
     */
    getRequestOptions(options) {
        options = Tools.default(options, {});
        options.headers = Tools.default(options.headers, { 'Content-Type': 'application/json' });
        return Object.assign(options, { observe: 'body' });
    }
    /**
     * Get standard path when Genese model contains genese.path
     */
    getStandardPath() {
        const model = new this.geneseMapperServiceT.tConstructor();
        if (!model['genese'] || !model['genese'].path) {
            throw Error('No Genese path environment for the model  : impossible to get element.');
        }
        else {
            return model['genese'].path;
        }
    }
}

class GeneseService {
    constructor(http, geneseEnvironment) {
        this.http = http;
        this.geneseEnvironment = geneseEnvironment;
    }
    /**
     * Return a new typed Genese instance
     */
    getGeneseInstance(tConstructor) {
        if (tConstructor) {
            return new Genese(this.http, this.geneseEnvironment, tConstructor);
        }
        return undefined;
    }
    instance(tConstructor, uConstructor) {
        if (!tConstructor && !uConstructor) {
            return new GeneseAngular(this.http, this.geneseEnvironment);
        }
        else if (!uConstructor) {
            return new GeneseAngular(this.http, this.geneseEnvironment, tConstructor);
        }
        else {
            return new GeneseAngular(this.http, this.geneseEnvironment, tConstructor, uConstructor);
        }
    }
}
GeneseService.decorators = [
    { type: Injectable }
];
GeneseService.ctorParameters = () => [
    { type: HttpClient },
    { type: GeneseEnvironmentService }
];

class GeneseAngularService {
    constructor() { }
}
GeneseAngularService.ɵprov = ɵɵdefineInjectable({ factory: function GeneseAngularService_Factory() { return new GeneseAngularService(); }, token: GeneseAngularService, providedIn: "root" });
GeneseAngularService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
GeneseAngularService.ctorParameters = () => [];

class GeneseComponent {
    constructor() { }
    ngOnInit() {
    }
}
GeneseComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-genese-angular',
                template: `
        <p>
            genese-angular works!
        </p>
    `
            },] }
];
GeneseComponent.ctorParameters = () => [];

function useFactory(http, geneseEnvironment) {
    return new GeneseService(http, geneseEnvironment);
}
class GeneseModule {
    static forRoot() {
        return {
            ngModule: GeneseModule,
            providers: [
                GeneseEnvironmentService,
                Tools,
                {
                    provide: GeneseService,
                    deps: [HttpClient, GeneseEnvironmentService],
                    useFactory
                }
            ]
        };
    }
}
GeneseModule.decorators = [
    { type: NgModule, args: [{
                declarations: [GeneseComponent],
                imports: [],
                providers: [
                    GeneseEnvironmentService,
                    Tools,
                ],
                exports: [GeneseComponent]
            },] }
];

class ExtractService {
    // --------------------------------------------------
    //                     CONSTRUCTOR
    // --------------------------------------------------
    constructor() { }
    // --------------------------------------------------
    //                     METHODS
    // --------------------------------------------------
    /**
     * Extract all the fields of some data corresponding to a given extraction model
     * @param data
     * @param extractionModel
     */
    static extractFieldsFromData(data, extractionModel) {
        if (!extractionModel) {
            return data;
        }
        const result = {};
        for (const key of Object.keys(extractionModel)) {
            Object.assign(result, { [key]: this.extractFieldsForOneProperty(data, key, extractionModel[key]) });
        }
        return result;
    }
    /**
     * For a given key of an extraction model and with the path corresponding of this key,
     * returns the fields from data which have the same key for the same path
     * @param data
     * @param key
     * @param pathExtraction
     */
    static extractFieldsForOneProperty(data, key, pathExtraction) {
        const extracts = [];
        if (Array.isArray(data)) {
            for (const element of data) {
                extracts.push(this.extractFieldsForOneProperty(element, key, pathExtraction));
            }
        }
        else {
            return ExtractService.extractValue(data, key, pathExtraction);
        }
        return extracts;
    }
    /**
     * With a given key and a given path, extracts the value of a data object for this key and this path
     * @param data
     * @param key
     * @param path
     */
    static extractValue(data, key, path) {
        if (!data || !path || typeof path !== 'string') {
            return data;
        }
        const branches = path.split('.');
        let value;
        for (const branch of branches) {
            if (!value) {
                value = data[branch];
            }
            else {
                value = value[branch];
            }
        }
        return value;
    }
}
ExtractService.decorators = [
    { type: Injectable }
];
ExtractService.ctorParameters = () => [];

class GeneseConfig {
    constructor() {
        this.pagination = {
            pageIndex: 'gnPageIndex',
            pageSize: 'gnPageSize',
            results: 'gnResults',
            totalResults: 'gnTotalResults'
        };
    }
}

class GeneseModelEnvironment {
    constructor() {
        this.path = '';
    }
}

const PRIMITIVES = ['String', 'Number', 'Boolean'];

class RequestOptions {
    constructor() {
        this.mapData = true;
    }
}

/*
 * Public API Surface of angular
 */
class GnModule {
    static forRoot() {
        return {
            ngModule: GnModule,
            providers: [
                GeneseEnvironmentService,
                Tools,
                {
                    provide: GeneseService,
                    deps: [HttpClient, GeneseEnvironmentService],
                    useFactory(http, geneseEnvironment) {
                        const service = new GeneseService(http, geneseEnvironment);
                        return service;
                    }
                }
            ]
        };
    }
    static forChild() {
        return {
            ngModule: GnModule,
            providers: [
                GeneseEnvironmentService,
                Tools,
                {
                    provide: GeneseService,
                    deps: [HttpClient, GeneseEnvironmentService],
                    useFactory(http, geneseEnvironment) {
                        const service = new GeneseService(http, geneseEnvironment);
                        return service;
                    }
                }
            ]
        };
    }
}
GnModule.decorators = [
    { type: NgModule }
];

/**
 * Generated bundle index. Do not edit.
 */

export { ExtractService, Genese, GeneseAngular, GeneseAngularService, GeneseComponent, GeneseConfig, GeneseEnvironmentService, GeneseModelEnvironment, GeneseModule, GeneseService, GnModule, PRIMITIVES, RequestMethod, RequestOptions, ResponseStatus, Tools, useFactory };
//# sourceMappingURL=genese-angular.js.map

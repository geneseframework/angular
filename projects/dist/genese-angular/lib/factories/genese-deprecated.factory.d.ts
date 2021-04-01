import { GetAllParams, GetAllResponse, GetAllWithPaginationParams } from '../models/get-all-params.model';
import { TConstructor } from '../models/t-constructor.model';
import { GeneseEnvironmentService } from '../services/genese-environment.service';
import { ResponseStatus } from '../enums/response-status';
import { RequestMethod } from '../enums/request-method';
import { RequestOptions } from '../models/request-options.model';
import { GetOneParams } from '../models/get-one-params.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class Genese<T> {
    private http;
    private geneseEnvironment;
    private tConstructor;
    private geneseMapperService;
    constructor(http: HttpClient, geneseEnvironment: GeneseEnvironmentService, tConstructor: TConstructor<T>);
    /**
     * Creates an object and return an Observable of the created object with T type
     * @deprecated since 1.2.0. Please use post() method instead
     */
    create(newObject: T, options?: RequestOptions): Observable<T | any>;
    /**
     * Creates an object and return an Observable of the created object with T type
     * @deprecated since 1.2.0. Please use post() method instead
     */
    createCustom(path: string, body?: object, options?: RequestOptions): Observable<T | any>;
    /**
     * Deletes an element and returns success or failed status.
     * This method needs to respect Genese standard model
     */
    delete(id: string): Observable<ResponseStatus>;
    /**
     * Delete an element and returns success or failed status.
     * This method can be used with custom params.
     */
    deleteCustom(path: string, options?: RequestOptions): Observable<ResponseStatus>;
    /**
     * Returns mapped object using fetch method
     */
    fetch(path: string, method: RequestMethod, requestInit?: RequestInit): Promise<T>;
    /**
     * Get all elements of array of data returned by GET request and map them with T type
     */
    getAll(params?: GetAllParams): Observable<T[]>;
    /**
     * Get all elements of array of data returned by GET request and map them with T type
     * If you want specific HttpParams you should to declare them in the second parameter because
     * they have priority over RequestOptions
     */
    getAllCustom(path: string, params?: GetAllParams, requestOptions?: RequestOptions): Observable<T[]>;
    /**
     * Get all elements with pagination
     * If the http response have paginated format, it returns paginated response with this format :
     * {
     *      totalResults?: number;
     *      results: T[];
     * }
     */
    getAllWithPagination(path: string, params: GetAllWithPaginationParams): Observable<GetAllResponse<T>>;
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
    getArray(): Observable<any>;
    /**
     * Get one element of the T class (or the U class if the uConstructor param is defined)
     */
    getOne(id: string): Observable<T>;
    /**
     * Get one element of the T class (or the U class if the uConstructor param is defined)
     */
    getOneCustom(path: string, params?: GetOneParams): Observable<T>;
    /**
     * Get one element of the T class (or the U class if the uConstructor param is defined)
     */
    request(path: string, method: RequestMethod, options?: RequestOptions): Observable<T | any>;
    /**
     * Update an element with T type
     * @deprecated since 1.2.0. Please use put() method instead
     */
    update(id: string, updatedObject: T, options?: RequestOptions): Observable<T | any>;
    /**
     * Update an element with T type
     * @deprecated since 1.2.0. Please use put() method instead
     */
    updateCustom(path: string, body?: object, options?: RequestOptions): Observable<T | any>;
    /**
     * Get the root path of the api
     */
    apiRoot(path?: string, id?: string): string;
    /**
     * Check if the id is correct
     */
    checkId(id: string): void;
    /**
     * Check if the type T implements the ArrayResponse interface.
     */
    checkIfTTypeIsArrayResponseType(): void;
    /**
     * Check if the path is correct
     */
    checkPath(path: string): void;
    /**
     * Check if the path is correct
     */
    checkTType(newObject: any): void;
    /**
     * Get request options of the http request
     */
    private getRequestOptions;
    /**
     * Check if the response is paginated
     */
    private isPaginatedResponse;
    /**
     * Get standard path when Genese model contains genese.path
     */
    private getStandardPath;
    /**
     * Translate data for a given language
     */
    translate(data: any, language: string): any;
}

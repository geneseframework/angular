import { TConstructor } from '../models/t-constructor.model';
import { GeneseEnvironmentService } from '../services/genese-environment.service';
import { RequestOptions } from '../models/request-options.model';
import { ResponseStatus } from '../enums/response-status';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class GeneseAngular<T, U> {
    private geneseEnvironmentService;
    private geneseMapperServiceT?;
    private geneseMapperServiceU?;
    private http;
    private readonly tConstructor?;
    private readonly uConstructor?;
    constructor(http: HttpClient, geneseEnvironmentService: GeneseEnvironmentService, tConstructor?: TConstructor<T>, uConstructor?: TConstructor<U>);
    /**
     * Deletes an element and returns success or failed status.
     * This method needs to respect Genese standard model
     */
    delete(path: string, options?: RequestOptions): Observable<T | ResponseStatus>;
    /**
     * Calls a GET request in order to get all elements of an array and to map them with T[] type
     * @param path              the route of the endpoint
     * @param requestOptions    the options of the request
     */
    getAll(path: string, requestOptions?: RequestOptions): Observable<T[]>;
    /**
     * Calls GET request and returns an object with T type
     * Warning : do not use this method in order to return an array. Use getAll() method instead.
     * @param path              the route of the endpoint
     * @param requestOptions    the options of the request
     */
    get(path: string, requestOptions?: RequestOptions): Observable<T>;
    /**
     * Calls PATCH request and returns eventually a response
     * @param path          the route of the endpoint
     * @param body          the body of the request
     * @param options       the options of the request
     */
    patch(path: string, body: any, options?: RequestOptions): Observable<T | any>;
    /**
     * Calls POST request and returns eventually a response
     * @param path          the route of the endpoint
     * @param body          the body of the request
     * @param options       the options of the request
     */
    post(path: string, body: any, options?: RequestOptions): Observable<T | any>;
    /**
     * Calls PUT request and returns eventually a response
     * @param path          the route of the endpoint
     * @param body          the body of the request
     * @param options       the options of the request
     */
    put(path: string, body: any, options?: RequestOptions): Observable<T | any>;
    /**
     * Experimental method
     */
    crud(requestMethod: 'patch' | 'post' | 'put', path: string, body: any, options?: RequestOptions): Observable<T | any>;
    /**
     * Get request options of the http request
     */
    private getRequestOptions;
    /**
     * Get standard path when Genese model contains genese.path
     */
    private getStandardPath;
}

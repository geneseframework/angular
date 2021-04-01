import { __awaiter } from "tslib";
import { Tools } from '../services/tools.service';
import { ResponseStatus } from '../enums/response-status';
import { RequestMethod } from '../enums/request-method';
import { GeneseMapper } from 'genese-mapper';
import { HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
export class Genese {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXNlLWRlcHJlY2F0ZWQuZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2dlbmVzZS9hbmd1bGFyL3NyYy9saWIvZmFjdG9yaWVzL2dlbmVzZS1kZXByZWNhdGVkLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFjLFVBQVUsRUFBZ0IsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxNQUFNLE9BQU8sTUFBTTtJQU1mLFlBQW9CLElBQWdCLEVBQ2hCLGlCQUEyQyxFQUMzQyxZQUE2QjtRQUY3QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBMEI7UUFDM0MsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLFlBQVksQ0FBSSxZQUFZLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBR0QscURBQXFEO0lBQ3JELGlDQUFpQztJQUNqQyxxREFBcUQ7SUFHckQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLFNBQVksRUFBRSxPQUF3QjtRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFF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QUMsQ0FBQztZQUNwRSxPQUFPLFNBQVMsQ0FBQztTQUNwQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM3RDtJQUNMLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdldEFsbFBhcmFtcywgR2V0QWxsUmVzcG9uc2UsIEdldEFsbFdpdGhQYWdpbmF0aW9uUGFyYW1zIH0gZnJvbSAnLi4vbW9kZWxzL2dldC1hbGwtcGFyYW1zLm1vZGVsJztcbmltcG9ydCB7IFRDb25zdHJ1Y3RvciB9IGZyb20gJy4uL21vZGVscy90LWNvbnN0cnVjdG9yLm1vZGVsJztcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSAnLi4vc2VydmljZXMvdG9vbHMuc2VydmljZSc7XG5pbXBvcnQgeyBHZW5lc2VFbnZpcm9ubWVudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9nZW5lc2UtZW52aXJvbm1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBSZXNwb25zZVN0YXR1cyB9IGZyb20gJy4uL2VudW1zL3Jlc3BvbnNlLXN0YXR1cyc7XG5pbXBvcnQgeyBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnLi4vZW51bXMvcmVxdWVzdC1tZXRob2QnO1xuaW1wb3J0IHsgUmVxdWVzdE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvcmVxdWVzdC1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IEdldE9uZVBhcmFtcyB9IGZyb20gJy4uL21vZGVscy9nZXQtb25lLXBhcmFtcy5tb2RlbCc7XG5pbXBvcnQgeyBHZW5lc2VNYXBwZXIgfSBmcm9tICdnZW5lc2UtbWFwcGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBHZW5lc2U8VD4ge1xuXG5cbiAgICBwcml2YXRlIGdlbmVzZU1hcHBlclNlcnZpY2U6IEdlbmVzZU1hcHBlcjxUPjtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZ2VuZXNlRW52aXJvbm1lbnQ6IEdlbmVzZUVudmlyb25tZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRDb25zdHJ1Y3RvcjogVENvbnN0cnVjdG9yPFQ+KSB7XG4gICAgICAgIHRoaXMuZ2VuZXNlTWFwcGVyU2VydmljZSA9IG5ldyBHZW5lc2VNYXBwZXI8VD4odENvbnN0cnVjdG9yKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gICAgICAgICAgICAgICAgICAgQ1JVRCBNRVRIT0RTXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBvYmplY3QgYW5kIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIHRoZSBjcmVhdGVkIG9iamVjdCB3aXRoIFQgdHlwZVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIDEuMi4wLiBQbGVhc2UgdXNlIHBvc3QoKSBtZXRob2QgaW5zdGVhZFxuICAgICAqL1xuICAgIGNyZWF0ZShuZXdPYmplY3Q6IFQsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VCB8IGFueT4ge1xuICAgICAgICB0aGlzLmNoZWNrVFR5cGUobmV3T2JqZWN0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYXBpUm9vdCh0aGlzLmdldFN0YW5kYXJkUGF0aCgpKSwgbmV3T2JqZWN0LCB0aGlzLmdldFJlcXVlc3RPcHRpb25zKG9wdGlvbnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5tYXBEYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVzZU1hcHBlclNlcnZpY2UubWFwKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBvYmplY3QgYW5kIHJldHVybiBhbiBPYnNlcnZhYmxlIG9mIHRoZSBjcmVhdGVkIG9iamVjdCB3aXRoIFQgdHlwZVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIDEuMi4wLiBQbGVhc2UgdXNlIHBvc3QoKSBtZXRob2QgaW5zdGVhZFxuICAgICAqL1xuICAgIGNyZWF0ZUN1c3RvbShwYXRoOiBzdHJpbmcsIGJvZHk/OiBvYmplY3QsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VCB8IGFueT4ge1xuICAgICAgICB0aGlzLmNoZWNrUGF0aChwYXRoKTtcbiAgICAgICAgYm9keSA9IFRvb2xzLmRlZmF1bHQoYm9keSwge30pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5hcGlSb290KHBhdGgpLCBib2R5LCB0aGlzLmdldFJlcXVlc3RPcHRpb25zKG9wdGlvbnMpKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5tYXBEYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVzZU1hcHBlclNlcnZpY2UubWFwKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhbiBlbGVtZW50IGFuZCByZXR1cm5zIHN1Y2Nlc3Mgb3IgZmFpbGVkIHN0YXR1cy5cbiAgICAgKiBUaGlzIG1ldGhvZCBuZWVkcyB0byByZXNwZWN0IEdlbmVzZSBzdGFuZGFyZCBtb2RlbFxuICAgICAqL1xuICAgIGRlbGV0ZShpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXNwb25zZVN0YXR1cz4ge1xuICAgICAgICB0aGlzLmNoZWNrSWQoaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShgJHt0aGlzLmFwaVJvb3QodGhpcy5nZXRTdGFuZGFyZFBhdGgoKSl9LyR7aWR9YCwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlICYmIHJlc3BvbnNlLm9rID09PSB0cnVlID8gUmVzcG9uc2VTdGF0dXMuU1VDQ0VTUyA6IFJlc3BvbnNlU3RhdHVzLkZBSUxFRDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIGFuIGVsZW1lbnQgYW5kIHJldHVybnMgc3VjY2VzcyBvciBmYWlsZWQgc3RhdHVzLlxuICAgICAqIFRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIHdpdGggY3VzdG9tIHBhcmFtcy5cbiAgICAgKi9cbiAgICBkZWxldGVDdXN0b20ocGF0aDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlU3RhdHVzPiB7XG4gICAgICAgIHRoaXMuY2hlY2tQYXRoKHBhdGgpO1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmFwaVJvb3QocGF0aCk7XG4gICAgICAgIG9wdGlvbnMgPSBUb29scy5kZWZhdWx0KG9wdGlvbnMsIHt9KTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZSh1cmwsIG9wdGlvbnMgYXMgdW5rbm93bilcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZSAmJiByZXNwb25zZS5vayA9PT0gdHJ1ZSA/IFJlc3BvbnNlU3RhdHVzLlNVQ0NFU1MgOiBSZXNwb25zZVN0YXR1cy5GQUlMRUQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgbWFwcGVkIG9iamVjdCB1c2luZyBmZXRjaCBtZXRob2RcbiAgICAgKi9cbiAgICBhc3luYyBmZXRjaChwYXRoOiBzdHJpbmcsIG1ldGhvZDogUmVxdWVzdE1ldGhvZCwgcmVxdWVzdEluaXQ/OiBSZXF1ZXN0SW5pdCk6IFByb21pc2U8VD4ge1xuICAgICAgICBpZiAoIW1ldGhvZCB8fCAhcGF0aCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignSW5jb3JyZWN0IHBhcmFtZXRlcnMgOiBpbXBvc3NpYmxlIHRvIHNlbmQgcmVxdWVzdCcpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdJbmNvcnJlY3QgcGFyYW1ldGVycyA6IGltcG9zc2libGUgdG8gc2VuZCByZXF1ZXN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5hcGlSb290KHBhdGgpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgcmVxdWVzdEluaXQpO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuY2xvbmUoKS5qc29uKCk7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFJlcXVlc3RNZXRob2QuREVMRVRFKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lc2VNYXBwZXJTZXJ2aWNlLm1hcChkYXRhID8gZGF0YS5ib2R5IDogdW5kZWZpbmVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVzZU1hcHBlclNlcnZpY2UubWFwKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZWxlbWVudHMgb2YgYXJyYXkgb2YgZGF0YSByZXR1cm5lZCBieSBHRVQgcmVxdWVzdCBhbmQgbWFwIHRoZW0gd2l0aCBUIHR5cGVcbiAgICAgKi9cbiAgICBnZXRBbGwocGFyYW1zPzogR2V0QWxsUGFyYW1zKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhwYXJhbXMuZmlsdGVycykpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmZpbHRlcnNba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoa2V5LCBwYXJhbXMuZmlsdGVyc1trZXldLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0ge3BhcmFtczogaHR0cFBhcmFtc307XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuYXBpUm9vdCh0aGlzLmdldFN0YW5kYXJkUGF0aCgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlID8gdGhpcy5nZW5lc2VNYXBwZXJTZXJ2aWNlLmFycmF5TWFwKHJlc3BvbnNlKSA6IFtdO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBlbGVtZW50cyBvZiBhcnJheSBvZiBkYXRhIHJldHVybmVkIGJ5IEdFVCByZXF1ZXN0IGFuZCBtYXAgdGhlbSB3aXRoIFQgdHlwZVxuICAgICAqIElmIHlvdSB3YW50IHNwZWNpZmljIEh0dHBQYXJhbXMgeW91IHNob3VsZCB0byBkZWNsYXJlIHRoZW0gaW4gdGhlIHNlY29uZCBwYXJhbWV0ZXIgYmVjYXVzZVxuICAgICAqIHRoZXkgaGF2ZSBwcmlvcml0eSBvdmVyIFJlcXVlc3RPcHRpb25zXG4gICAgICovXG4gICAgZ2V0QWxsQ3VzdG9tKHBhdGg6IHN0cmluZywgcGFyYW1zPzogR2V0QWxsUGFyYW1zLCByZXF1ZXN0T3B0aW9ucz86IFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBwYXRoIDogaW1wb3NzaWJsZSB0byBnZXQgZWxlbWVudHMnKTtcbiAgICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMgJiYgcmVxdWVzdE9wdGlvbnMucGFyYW1zKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZXF1ZXN0T3B0aW9ucy5wYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLnBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldChrZXksIHJlcXVlc3RPcHRpb25zLnBhcmFtc1trZXldLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0T3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMuZmlsdGVycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocGFyYW1zLmZpbHRlcnMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5maWx0ZXJzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGtleSwgcGFyYW1zLmZpbHRlcnNba2V5XS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHtwYXJhbXM6IGh0dHBQYXJhbXN9LCByZXF1ZXN0T3B0aW9ucykgYXMgYW55O1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmFwaVJvb3QocGF0aCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwgYWxsT3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZSA/IHRoaXMuZ2VuZXNlTWFwcGVyU2VydmljZS5hcnJheU1hcChyZXNwb25zZSkgOiBbXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZWxlbWVudHMgd2l0aCBwYWdpbmF0aW9uXG4gICAgICogSWYgdGhlIGh0dHAgcmVzcG9uc2UgaGF2ZSBwYWdpbmF0ZWQgZm9ybWF0LCBpdCByZXR1cm5zIHBhZ2luYXRlZCByZXNwb25zZSB3aXRoIHRoaXMgZm9ybWF0IDpcbiAgICAgKiB7XG4gICAgICogICAgICB0b3RhbFJlc3VsdHM/OiBudW1iZXI7XG4gICAgICogICAgICByZXN1bHRzOiBUW107XG4gICAgICogfVxuICAgICAqL1xuICAgIGdldEFsbFdpdGhQYWdpbmF0aW9uKHBhdGg6IHN0cmluZywgcGFyYW1zOiBHZXRBbGxXaXRoUGFnaW5hdGlvblBhcmFtcyk6IE9ic2VydmFibGU8R2V0QWxsUmVzcG9uc2U8VD4+IHtcbiAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBwYXRoIDogaW1wb3NzaWJsZSB0byBnZXQgcGFnaW5hdGVkIGVsZW1lbnRzJyk7XG4gICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBhcmFtcyB8fCAhcGFyYW1zLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdJbmNvcnJlY3QgcGFyYW1ldGVycyA6IGltcG9zc2libGUgdG8gZ2V0IHBhZ2luYXRlZCBlbGVtZW50cy4gVGhlIHBhcmFtZXRlciBwYWdlU2l6ZSBtdXN0IGJlIGRlZmluZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gb2YodW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMucGFnZUluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQodGhpcy5nZW5lc2VFbnZpcm9ubWVudC5wYWdlSW5kZXgsIHBhcmFtcy5wYWdlSW5kZXgudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYW1zLnBhZ2VTaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQodGhpcy5nZW5lc2VFbnZpcm9ubWVudC5wYWdlU2l6ZSwgcGFyYW1zLnBhZ2VTaXplLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocGFyYW1zLmZpbHRlcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZmlsdGVyc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoa2V5LCBwYXJhbXMuZmlsdGVyc1trZXldLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7cGFyYW1zOiBodHRwUGFyYW1zfTtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5hcGlSb290KHBhdGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgdGhpcy5pc1BhZ2luYXRlZFJlc3BvbnNlKHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogdGhpcy5nZW5lc2VNYXBwZXJTZXJ2aWNlLmFycmF5TWFwKHJlc3BvbnNlW3RoaXMuZ2VuZXNlRW52aXJvbm1lbnQucmVzdWx0c10pLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxSZXN1bHRzOiByZXNwb25zZVt0aGlzLmdlbmVzZUVudmlyb25tZW50LnRvdGFsUmVzdWx0c11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSZXNwb25zZSBpcyBub3QgcGFnaW5hdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdQbGVhc2UgdmVyaWZ5IHRoYXQgdGhlIHJlc3BvbnNlIGluY2x1ZGVzIGFuIGFycmF5IGNvcnJlc3BvbmRpbmcgdG8geW91ciBHZW5lc2UgcGFnaW5hdGlvbiBlbnZpcm9ubWVudC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIGNhbGxlZCB3aGVuIHRoZSBodHRwIHJlc3BvbnNlIGlzIG5vdCBhbiBvYmplY3QsIGJ1dCBhbiBhcnJheSAoZm9yIGV4YW1wbGUgOiBbJ2EnLCAnYiddKVxuICAgICAqIFRoZSBEVE8gbW9kZWwgbXVzdCBpbXBsZW1lbnQgdGhlIEFycmF5UmVzcG9uc2UgaW50ZXJmYWNlXG4gICAgICpcbiAgICAgKiBFeGFtcGxlIDpcbiAgICAgKiBNeU1vZGVsIHtcbiAgICAgKiAgICAgZ25BcnJheVJlc3BvbnNlOiBbe1xuICAgICAqICAgICAgICAgaWQ6ICcnLFxuICAgICAqICAgICAgICAgbmFtZTogJydcbiAgICAgKiAgICAgfV1cbiAgICAgKiB9XG4gICAgICogVGhlIGdldEFycmF5IG1ldGhvZCB3aWxsIHJldHVybiB0aGUgcmVzcG9uc2UgYXJyYXkgd2l0aCB0aGUgY29ycmVjdCBmb3JtYXRcbiAgICAgKi9cbiAgICBnZXRBcnJheSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmNoZWNrSWZUVHlwZUlzQXJyYXlSZXNwb25zZVR5cGUoKTtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5hcGlSb290KHRoaXMuZ2V0U3RhbmRhcmRQYXRoKCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0T2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ25BcnJheVJlc3BvbnNlOiBkYXRhXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVzZU1hcHBlclNlcnZpY2UubWFwKHRPYmplY3QpID8gdGhpcy5nZW5lc2VNYXBwZXJTZXJ2aWNlLm1hcCh0T2JqZWN0KVsnZ25BcnJheVJlc3BvbnNlJ10gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIEdldCBvbmUgZWxlbWVudCBvZiB0aGUgVCBjbGFzcyAob3IgdGhlIFUgY2xhc3MgaWYgdGhlIHVDb25zdHJ1Y3RvciBwYXJhbSBpcyBkZWZpbmVkKVxuICAgICAqL1xuICAgIGdldE9uZShpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIHRoaXMuY2hlY2tJZChpZCk7XG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuYXBpUm9vdCh0aGlzLmdldFN0YW5kYXJkUGF0aCgpLCBpZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVzZU1hcHBlclNlcnZpY2UubWFwKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgb25lIGVsZW1lbnQgb2YgdGhlIFQgY2xhc3MgKG9yIHRoZSBVIGNsYXNzIGlmIHRoZSB1Q29uc3RydWN0b3IgcGFyYW0gaXMgZGVmaW5lZClcbiAgICAgKi9cbiAgICBnZXRPbmVDdXN0b20ocGF0aDogc3RyaW5nLCBwYXJhbXM/OiBHZXRPbmVQYXJhbXMpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgdGhpcy5jaGVja1BhdGgocGF0aCk7XG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocGFyYW1zLmZpbHRlcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZmlsdGVyc1trZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoa2V5LCBwYXJhbXMuZmlsdGVyc1trZXldLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7cGFyYW1zOiBodHRwUGFyYW1zfTtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5hcGlSb290KHBhdGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIG9wdGlvbnMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lc2VNYXBwZXJTZXJ2aWNlLm1hcChkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogR2V0IG9uZSBlbGVtZW50IG9mIHRoZSBUIGNsYXNzIChvciB0aGUgVSBjbGFzcyBpZiB0aGUgdUNvbnN0cnVjdG9yIHBhcmFtIGlzIGRlZmluZWQpXG4gICAgICovXG4gICAgcmVxdWVzdChwYXRoOiBzdHJpbmcsIG1ldGhvZDogUmVxdWVzdE1ldGhvZCwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zKTogT2JzZXJ2YWJsZTxUIHwgYW55PiB7XG4gICAgICAgIHRoaXMuY2hlY2tQYXRoKHBhdGgpO1xuICAgICAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0luY29ycmVjdCBHZW5lc2UgbWV0aG9kIDogaW1wb3NzaWJsZSB0byBzZW5kIHJlcXVlc3QnKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gVG9vbHMuZGVmYXVsdChvcHRpb25zLCB7fSk7XG4gICAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzXG4gICAgICAgICAgICAmJiAobWV0aG9kID09PSBSZXF1ZXN0TWV0aG9kLlBPU1QgfHwgbWV0aG9kID09PSBSZXF1ZXN0TWV0aG9kLlBVVCB8fCBtZXRob2QgPT09IFJlcXVlc3RNZXRob2QuUEFUQ0gpKSB7XG4gICAgICAgICAgICBvcHRpb25zLmhlYWRlcnMgPSB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpb25zLm9ic2VydmUgJiYgbWV0aG9kID09PSBSZXF1ZXN0TWV0aG9kLkRFTEVURSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vYnNlcnZlID0gJ3Jlc3BvbnNlJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmFwaVJvb3QocGF0aCwgb3B0aW9ucy5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChtZXRob2QsIHVybCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gUmVxdWVzdE1ldGhvZC5ERUxFVEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubWFwRGF0YSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lc2VNYXBwZXJTZXJ2aWNlLm1hcChyZXN1bHQgPyByZXN1bHQuYm9keSA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm1hcERhdGEgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXNlTWFwcGVyU2VydmljZS5tYXAocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW4gZWxlbWVudCB3aXRoIFQgdHlwZVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIDEuMi4wLiBQbGVhc2UgdXNlIHB1dCgpIG1ldGhvZCBpbnN0ZWFkXG4gICAgICovXG4gICAgdXBkYXRlKGlkOiBzdHJpbmcsIHVwZGF0ZWRPYmplY3Q6IFQsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VCB8IGFueT4ge1xuICAgICAgICB0aGlzLmNoZWNrSWQoaWQpO1xuICAgICAgICB0aGlzLmNoZWNrVFR5cGUodXBkYXRlZE9iamVjdCk7XG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHRoaXMuZ2V0UmVxdWVzdE9wdGlvbnMob3B0aW9ucyksIHtvYnNlcnZlOiAnYm9keSd9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5hcGlSb290KHRoaXMuZ2V0U3RhbmRhcmRQYXRoKCkpLCB1cGRhdGVkT2JqZWN0LCBvcHRpb25zIGFzIHVua25vd24pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5tYXBEYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVzZU1hcHBlclNlcnZpY2UubWFwKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGFuIGVsZW1lbnQgd2l0aCBUIHR5cGVcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSAxLjIuMC4gUGxlYXNlIHVzZSBwdXQoKSBtZXRob2QgaW5zdGVhZFxuICAgICAqL1xuICAgIHVwZGF0ZUN1c3RvbShwYXRoOiBzdHJpbmcsIGJvZHk/OiBvYmplY3QsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9ucyk6IE9ic2VydmFibGU8VCB8IGFueT4ge1xuICAgICAgICB0aGlzLmNoZWNrUGF0aChwYXRoKTtcbiAgICAgICAgYm9keSA9IFRvb2xzLmRlZmF1bHQoYm9keSwge30pO1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLmdldFJlcXVlc3RPcHRpb25zKG9wdGlvbnMpLCB7b2JzZXJ2ZTogJ2JvZHknfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuYXBpUm9vdChwYXRoKSwgYm9keSwgb3B0aW9ucyBhcyB1bmtub3duKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubWFwRGF0YSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lc2VNYXBwZXJTZXJ2aWNlLm1hcChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vICAgICAgICAgICAgICAgICAgIE9USEVSIE1FVEhPRFNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvb3QgcGF0aCBvZiB0aGUgYXBpXG4gICAgICovXG4gICAgYXBpUm9vdChwYXRoPzogc3RyaW5nLCBpZD86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHVybCA9IHBhdGggPyB0aGlzLmdlbmVzZUVudmlyb25tZW50LmFwaSArIHBhdGggOiB0aGlzLmdlbmVzZUVudmlyb25tZW50LmFwaTtcbiAgICAgICAgcmV0dXJuIGlkID8gYCR7dXJsfS8ke2lkfWAgOiB1cmw7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBpZCBpcyBjb3JyZWN0XG4gICAgICovXG4gICAgY2hlY2tJZChpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICghaWQgfHwgISgraWQgPiAwKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0luY29ycmVjdCBHZW5lc2UgaWQuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIHR5cGUgVCBpbXBsZW1lbnRzIHRoZSBBcnJheVJlc3BvbnNlIGludGVyZmFjZS5cbiAgICAgKi9cbiAgICBjaGVja0lmVFR5cGVJc0FycmF5UmVzcG9uc2VUeXBlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0T2JqZWN0ID0gbmV3IHRoaXMudENvbnN0cnVjdG9yKCk7XG4gICAgICAgIGlmICghdE9iamVjdFsnZ25BcnJheVJlc3BvbnNlJ10pIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUaGUgbW9kZWwgbXVzdCBjb250YWluIHRoZSBnbkFycmF5UmVzcG9uc2UgcHJvcGVydHkuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIHBhdGggaXMgY29ycmVjdFxuICAgICAqL1xuICAgIGNoZWNrUGF0aChwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFwYXRoIHx8IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0luY29ycmVjdCBHZW5lc2UgcGF0aC4nKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgcGF0aCBpcyBjb3JyZWN0XG4gICAgICovXG4gICAgLy8gVE9ETyA6IGNoZWNrIG5lc3RlZCBrZXlzXG4gICAgY2hlY2tUVHlwZShuZXdPYmplY3Q6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAoIW5ld09iamVjdCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0dlbmVzZSA6IHRoZXJlIGlzIG5vIFQgb2JqZWN0LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdPYmplY3QgPT09IHt9KSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignR2VuZXNlIDogZW1wdHkgb2JqZWN0LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld09iamVjdCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdHZW5lc2UgOiBhbiBhcnJheSBpcyBub3QgYSBUIG9iamVjdC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0T2JqZWN0ID0gbmV3IHRoaXMudENvbnN0cnVjdG9yKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKG5ld09iamVjdCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0T2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignR2VuZXNlIDogdGhlIG9iamVjdCBpcyBub3QgYSBUIG9iamVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHJlcXVlc3Qgb3B0aW9ucyBvZiB0aGUgaHR0cCByZXF1ZXN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXF1ZXN0T3B0aW9ucyhvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyk6IGFueSB7XG4gICAgICAgIG9wdGlvbnMgPSBUb29scy5kZWZhdWx0KG9wdGlvbnMsIHt9KTtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzID0gVG9vbHMuZGVmYXVsdChvcHRpb25zLmhlYWRlcnMsIHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7XG4gICAgICAgIHJldHVybiAgT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7b2JzZXJ2ZTogJ2JvZHknfSk7XG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSByZXNwb25zZSBpcyBwYWdpbmF0ZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzUGFnaW5hdGVkUmVzcG9uc2UoZGF0YTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBkYXRhICYmIEFycmF5LmlzQXJyYXkoZGF0YVt0aGlzLmdlbmVzZUVudmlyb25tZW50LnJlc3VsdHNdKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHN0YW5kYXJkIHBhdGggd2hlbiBHZW5lc2UgbW9kZWwgY29udGFpbnMgZ2VuZXNlLnBhdGhcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFN0YW5kYXJkUGF0aCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyB0aGlzLmdlbmVzZU1hcHBlclNlcnZpY2UudENvbnN0cnVjdG9yKCk7XG4gICAgICAgIGlmICghbW9kZWxbJ2dlbmVzZSddIHx8ICFtb2RlbFsnZ2VuZXNlJ10ucGF0aCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ05vIEdlbmVzZSBwYXRoIGVudmlyb25tZW50IGZvciB0aGUgbW9kZWwgIDogaW1wb3NzaWJsZSB0byBnZXQgZWxlbWVudC4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbFsnZ2VuZXNlJ10ucGF0aDtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgZGF0YSBmb3IgYSBnaXZlbiBsYW5ndWFnZVxuICAgICAqL1xuICAgIHRyYW5zbGF0ZShkYXRhOiBhbnksIGxhbmd1YWdlOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAoIWxhbmd1YWdlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBkYXRhIG9yIG5vIGxhbmd1YWdlIDogaW1wb3NzaWJsZSB0byBnZXQgZWxlbWVudCcpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVzZU1hcHBlclNlcnZpY2UudHJhbnNsYXRlKGRhdGEsIGxhbmd1YWdlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
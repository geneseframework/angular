import { HttpHeaders, HttpParams } from '@angular/common/http';
export declare class RequestOptions {
    body?: any;
    cookieParams?: any;
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    id?: string;
    mapData?: boolean;
    observe?: HttpObserve;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    queryParams?: {
        [param: string]: string;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
export declare type HttpObserve = 'body' | 'events' | 'response';

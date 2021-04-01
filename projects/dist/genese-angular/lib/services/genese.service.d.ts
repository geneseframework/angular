import { HttpClient } from '@angular/common/http';
import { GeneseEnvironmentService } from './genese-environment.service';
import { TConstructor } from '../models/t-constructor.model';
import { Genese } from '../factories/genese-deprecated.factory';
import { GeneseAngular } from '../factories/genese-angular.factory';
export declare class GeneseService {
    private http;
    private geneseEnvironment;
    constructor(http: HttpClient, geneseEnvironment: GeneseEnvironmentService);
    /**
     * Return a new typed Genese instance
     */
    getGeneseInstance<T>(tConstructor: TConstructor<T>): Genese<T>;
    /**
     * Experimental method for genese-api-angular
     */
    instance(): GeneseAngular<undefined, undefined>;
    instance<T>(tConstructor?: TConstructor<T>): GeneseAngular<T, undefined>;
    instance<T, U>(tConstructor?: TConstructor<T>, uConstructor?: TConstructor<U>): GeneseAngular<T, U>;
}

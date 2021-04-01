import { ModuleWithProviders } from '@angular/core';
import { GeneseEnvironmentService } from './services/genese-environment.service';
import { GeneseService } from './services/genese.service';
import { HttpClient } from '@angular/common/http';
export declare function useFactory(http: HttpClient, geneseEnvironment: GeneseEnvironmentService): GeneseService;
export declare class GeneseModule {
    static forRoot(): ModuleWithProviders<GeneseModule>;
}

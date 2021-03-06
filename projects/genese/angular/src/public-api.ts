/*
 * Public API Surface of angular
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { Tools } from './lib/services/tools.service';
import { GeneseService } from './lib/services/genese.service';
import { HttpClient } from '@angular/common/http';
import { GeneseEnvironmentService } from './lib/services/genese-environment.service';

// Root elements
export * from './lib/genese-angular.service';
export * from './lib/genese.component';
export * from './lib/genese.module';

// Services
export * from './lib/services/genese.service';
export * from './lib/services/tools.service';
export * from './lib/services/extract.service';
export * from './lib/services/genese-environment.service';

// Factories
export * from './lib/factories/genese-deprecated.factory';
export * from './lib/factories/genese-angular.factory';

// Models
export * from './lib/models/array-response.model';
export * from './lib/models/genese-config.model';
export * from './lib/models/genese-model-environment.model';
export * from './lib/models/get-all-params.model';
export * from './lib/models/get-one-params.model';
export * from './lib/models/primitive.model';
export * from './lib/models/request-options.model';
export * from './lib/models/t-constructor.model';

// Enums
export * from './lib/enums/request-method';
export * from './lib/enums/response-status';

@NgModule()
export class GnModule {
    static forRoot(): ModuleWithProviders<GnModule> {
        return {
            ngModule: GnModule,
            providers: [
                GeneseEnvironmentService,
                Tools,
                {
                    provide: GeneseService,
                    deps: [HttpClient, GeneseEnvironmentService],
                    useFactory(http: HttpClient, geneseEnvironment: GeneseEnvironmentService) {
                        const service = new GeneseService(http, geneseEnvironment);
                        return service;
                    }
                }]
        };
    }

    static forChild(): ModuleWithProviders<GnModule> {
        return {
            ngModule: GnModule,
            providers: [
                GeneseEnvironmentService,
                Tools,
                {
                    provide: GeneseService,
                    deps: [HttpClient, GeneseEnvironmentService],
                    useFactory(http: HttpClient, geneseEnvironment: GeneseEnvironmentService) {
                        const service = new GeneseService(http, geneseEnvironment);
                        return service;
                    }
                }]
        };
    }
}


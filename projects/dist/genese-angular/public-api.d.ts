import { ModuleWithProviders } from '@angular/core';
export * from './lib/genese-angular.service';
export * from './lib/genese.component';
export * from './lib/genese.module';
export * from './lib/services/genese.service';
export * from './lib/services/tools.service';
export * from './lib/services/extract.service';
export * from './lib/services/genese-environment.service';
export * from './lib/factories/genese-deprecated.factory';
export * from './lib/factories/genese-angular.factory';
export * from './lib/models/array-response.model';
export * from './lib/models/genese-config.model';
export * from './lib/models/genese-model-environment.model';
export * from './lib/models/get-all-params.model';
export * from './lib/models/get-one-params.model';
export * from './lib/models/primitive.model';
export * from './lib/models/request-options.model';
export * from './lib/models/t-constructor.model';
export * from './lib/enums/request-method';
export * from './lib/enums/response-status';
export declare class GnModule {
    static forRoot(): ModuleWithProviders<GnModule>;
    static forChild(): ModuleWithProviders<GnModule>;
}

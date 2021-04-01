/*
 * Public API Surface of angular
 */
import { NgModule } from '@angular/core';
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
export class GnModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2dlbmVzZS9hbmd1bGFyL3NyYy9wdWJsaWMtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBRUgsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFckYsZ0JBQWdCO0FBQ2hCLGNBQWMsOEJBQThCLENBQUM7QUFDN0MsY0FBYyx3QkFBd0IsQ0FBQztBQUN2QyxjQUFjLHFCQUFxQixDQUFDO0FBRXBDLFdBQVc7QUFDWCxjQUFjLCtCQUErQixDQUFDO0FBQzlDLGNBQWMsOEJBQThCLENBQUM7QUFDN0MsY0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxjQUFjLDJDQUEyQyxDQUFDO0FBRTFELFlBQVk7QUFDWixjQUFjLDJDQUEyQyxDQUFDO0FBQzFELGNBQWMsd0NBQXdDLENBQUM7QUFFdkQsU0FBUztBQUNULGNBQWMsbUNBQW1DLENBQUM7QUFDbEQsY0FBYyxrQ0FBa0MsQ0FBQztBQUNqRCxjQUFjLDZDQUE2QyxDQUFDO0FBQzVELGNBQWMsbUNBQW1DLENBQUM7QUFDbEQsY0FBYyxtQ0FBbUMsQ0FBQztBQUNsRCxjQUFjLDhCQUE4QixDQUFDO0FBQzdDLGNBQWMsb0NBQW9DLENBQUM7QUFDbkQsY0FBYyxrQ0FBa0MsQ0FBQztBQUVqRCxRQUFRO0FBQ1IsY0FBYyw0QkFBNEIsQ0FBQztBQUMzQyxjQUFjLDZCQUE2QixDQUFDO0FBRzVDLE1BQU0sT0FBTyxRQUFRO0lBQ2pCLE1BQU0sQ0FBQyxPQUFPO1FBQ1YsT0FBTztZQUNILFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRTtnQkFDUCx3QkFBd0I7Z0JBQ3hCLEtBQUs7Z0JBQ0w7b0JBQ0ksT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSx3QkFBd0IsQ0FBQztvQkFDNUMsVUFBVSxDQUFDLElBQWdCLEVBQUUsaUJBQTJDO3dCQUNwRSxNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzt3QkFDM0QsT0FBTyxPQUFPLENBQUM7b0JBQ25CLENBQUM7aUJBQ0o7YUFBQztTQUNULENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPO1lBQ0gsUUFBUSxFQUFFLFFBQVE7WUFDbEIsU0FBUyxFQUFFO2dCQUNQLHdCQUF3QjtnQkFDeEIsS0FBSztnQkFDTDtvQkFDSSxPQUFPLEVBQUUsYUFBYTtvQkFDdEIsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLHdCQUF3QixDQUFDO29CQUM1QyxVQUFVLENBQUMsSUFBZ0IsRUFBRSxpQkFBMkM7d0JBQ3BFLE1BQU0sT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO3dCQUMzRCxPQUFPLE9BQU8sQ0FBQztvQkFDbkIsQ0FBQztpQkFDSjthQUFDO1NBQ1QsQ0FBQztJQUNOLENBQUM7OztZQWxDSixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFB1YmxpYyBBUEkgU3VyZmFjZSBvZiBhbmd1bGFyXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSAnLi9saWIvc2VydmljZXMvdG9vbHMuc2VydmljZSc7XG5pbXBvcnQgeyBHZW5lc2VTZXJ2aWNlIH0gZnJvbSAnLi9saWIvc2VydmljZXMvZ2VuZXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEdlbmVzZUVudmlyb25tZW50U2VydmljZSB9IGZyb20gJy4vbGliL3NlcnZpY2VzL2dlbmVzZS1lbnZpcm9ubWVudC5zZXJ2aWNlJztcblxuLy8gUm9vdCBlbGVtZW50c1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZ2VuZXNlLWFuZ3VsYXIuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9nZW5lc2UuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2dlbmVzZS5tb2R1bGUnO1xuXG4vLyBTZXJ2aWNlc1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvZ2VuZXNlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvdG9vbHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZXJ2aWNlcy9leHRyYWN0LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvZ2VuZXNlLWVudmlyb25tZW50LnNlcnZpY2UnO1xuXG4vLyBGYWN0b3JpZXNcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZhY3Rvcmllcy9nZW5lc2UtZGVwcmVjYXRlZC5mYWN0b3J5JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZhY3Rvcmllcy9nZW5lc2UtYW5ndWxhci5mYWN0b3J5JztcblxuLy8gTW9kZWxzXG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbHMvYXJyYXktcmVzcG9uc2UubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWxzL2dlbmVzZS1jb25maWcubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWxzL2dlbmVzZS1tb2RlbC1lbnZpcm9ubWVudC5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbHMvZ2V0LWFsbC1wYXJhbXMubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWxzL2dldC1vbmUtcGFyYW1zLm1vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZGVscy9wcmltaXRpdmUubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbW9kZWxzL3JlcXVlc3Qtb3B0aW9ucy5tb2RlbCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2RlbHMvdC1jb25zdHJ1Y3Rvci5tb2RlbCc7XG5cbi8vIEVudW1zXG5leHBvcnQgKiBmcm9tICcuL2xpYi9lbnVtcy9yZXF1ZXN0LW1ldGhvZCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9lbnVtcy9yZXNwb25zZS1zdGF0dXMnO1xuXG5ATmdNb2R1bGUoKVxuZXhwb3J0IGNsYXNzIEduTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEduTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogR25Nb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBHZW5lc2VFbnZpcm9ubWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgVG9vbHMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBHZW5lc2VTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgR2VuZXNlRW52aXJvbm1lbnRTZXJ2aWNlXSxcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeShodHRwOiBIdHRwQ2xpZW50LCBnZW5lc2VFbnZpcm9ubWVudDogR2VuZXNlRW52aXJvbm1lbnRTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gbmV3IEdlbmVzZVNlcnZpY2UoaHR0cCwgZ2VuZXNlRW52aXJvbm1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEduTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogR25Nb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBHZW5lc2VFbnZpcm9ubWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgVG9vbHMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBHZW5lc2VTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgR2VuZXNlRW52aXJvbm1lbnRTZXJ2aWNlXSxcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeShodHRwOiBIdHRwQ2xpZW50LCBnZW5lc2VFbnZpcm9ubWVudDogR2VuZXNlRW52aXJvbm1lbnRTZXJ2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlID0gbmV3IEdlbmVzZVNlcnZpY2UoaHR0cCwgZ2VuZXNlRW52aXJvbm1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuIl19
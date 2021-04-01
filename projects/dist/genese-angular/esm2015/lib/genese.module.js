import { NgModule } from '@angular/core';
import { Tools } from './services/tools.service';
import { GeneseEnvironmentService } from './services/genese-environment.service';
import { GeneseService } from './services/genese.service';
import { HttpClient } from '@angular/common/http';
import { GeneseComponent } from './genese.component';
export function useFactory(http, geneseEnvironment) {
    return new GeneseService(http, geneseEnvironment);
}
export class GeneseModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXNlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2dlbmVzZS9hbmd1bGFyL3NyYy9saWIvZ2VuZXNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDakYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFnQixFQUFFLGlCQUEyQztJQUNwRixPQUFPLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3RELENBQUM7QUFZRCxNQUFNLE9BQU8sWUFBWTtJQUNyQixNQUFNLENBQUMsT0FBTztRQUNWLE9BQU87WUFDSCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1Asd0JBQXdCO2dCQUN4QixLQUFLO2dCQUNMO29CQUNJLE9BQU8sRUFBRSxhQUFhO29CQUN0QixJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsd0JBQXdCLENBQUM7b0JBQzVDLFVBQVU7aUJBQ2I7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDOzs7WUF4QkosUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDL0IsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLHdCQUF3QjtvQkFDeEIsS0FBSztpQkFDUjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7YUFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbHMgfSBmcm9tICcuL3NlcnZpY2VzL3Rvb2xzLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2VuZXNlRW52aXJvbm1lbnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9nZW5lc2UtZW52aXJvbm1lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBHZW5lc2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9nZW5lc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgR2VuZXNlQ29tcG9uZW50IH0gZnJvbSAnLi9nZW5lc2UuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZhY3RvcnkoaHR0cDogSHR0cENsaWVudCwgZ2VuZXNlRW52aXJvbm1lbnQ6IEdlbmVzZUVudmlyb25tZW50U2VydmljZSkge1xuICAgIHJldHVybiBuZXcgR2VuZXNlU2VydmljZShodHRwLCBnZW5lc2VFbnZpcm9ubWVudCk7XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbR2VuZXNlQ29tcG9uZW50XSxcbiAgICBpbXBvcnRzOiBbXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgR2VuZXNlRW52aXJvbm1lbnRTZXJ2aWNlLFxuICAgICAgICBUb29scyxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtHZW5lc2VDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEdlbmVzZU1vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxHZW5lc2VNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBHZW5lc2VNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICBHZW5lc2VFbnZpcm9ubWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgVG9vbHMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBHZW5lc2VTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICBkZXBzOiBbSHR0cENsaWVudCwgR2VuZXNlRW52aXJvbm1lbnRTZXJ2aWNlXSxcbiAgICAgICAgICAgICAgICAgICAgdXNlRmFjdG9yeVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=
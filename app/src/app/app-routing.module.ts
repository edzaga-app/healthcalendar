import { NgModule } from '@angular/core';
import { 
  RouterModule, 
  Routes,
  PreloadAllModules
} from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NavComponent } from './core/components/nav/nav.component';
import { navRoutes, sideNavPath } from './nav-routing';


const routes: Routes = [
  {
    path: sideNavPath,
    component: NavComponent,
    children: navRoutes,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'inicio/:token',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

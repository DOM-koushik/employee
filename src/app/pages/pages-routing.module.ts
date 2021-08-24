import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
  {
    path: 'dashboard',
    component: ECommerceComponent,
  }, 
  {
    path:'profile',
    loadChildren:'./profile/profile.module#ProfileModule',
  }, 
  
  {
    path: 'employe',
    loadChildren: './employe/employe.module#EmployeModule',
  },
 
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  }, 
  {
    path: '**',
    component: NotFoundComponent,
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

import { EmployeComponent } from './employe.component';
import { AddEmployeComponent } from './add-employe/add-employe.component';
import { ListEmployeComponent } from './list-employe/list-employe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: EmployeComponent,
  children: [
  {path: 'add-employe',component: AddEmployeComponent},
  {path:'list-employe',component: ListEmployeComponent},
  {path:'edit-employe',component: AddEmployeComponent},
],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeRoutingModule { }

export const routedComponents = [
  EmployeComponent,
  AddEmployeComponent,
  ListEmployeComponent

];
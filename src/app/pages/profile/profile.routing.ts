import { ProfileComponent } from './profile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { ListProfileComponent } from './list-profile/list-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    
  {path: 'add-profile',component: AddProfileComponent},
  {path: 'list-profile',component: ListProfileComponent},
  {path: 'edit-profile',component: AddProfileComponent},
],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }

export const routedComponents = [
  ProfileComponent,
  AddProfileComponent,
  ListProfileComponent

];
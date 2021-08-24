import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileRoutingModule,routedComponents } from './profile.routing';
import { ToasterModule } from 'angular2-toaster';
import { TreeModule } from 'angular-tree-component';


@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
    ProfileRoutingModule,
    TreeModule
  ],
  declarations: [
   routedComponents,
  
  ],
   entryComponents : [
   
  ],
  providers: []
})
export class ProfileModule { }
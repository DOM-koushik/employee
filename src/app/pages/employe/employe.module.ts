import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EmployeRoutingModule,routedComponents } from './employe.routing';
import { ToasterModule } from 'angular2-toaster';
import { from } from 'rxjs';



@NgModule({
  imports: [
    ThemeModule,
    ToasterModule.forRoot(),
  	EmployeRoutingModule
  ],
  declarations: [
   routedComponents,
  
  ],
   entryComponents : [
   
  ],
  providers: []
})
export class EmployeModule { }
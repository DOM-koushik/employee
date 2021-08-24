import { Component,OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'list-profile',
  templateUrl: './list-profile.component.html',
})
export class ListProfileComponent implements OnInit {
  data;
  constructor(
  private router  : Router,

  ) {}


  ngOnInit(){
  
  }
  list(){
  
  }
   Edit_User(){
    
  }
}
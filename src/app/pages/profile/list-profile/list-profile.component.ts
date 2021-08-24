import { Component,OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'list-profile',
  templateUrl: './list-profile.component.html',
})
export class ListProfileComponent implements OnInit {
  datas;db:any;
  constructor(
  private router  : Router,

  ) { this.openDB();this.list() }


  ngOnInit(){
    localStorage.removeItem('proid')
    this.list()
  }

  openDB() {

    this.db = (<any>window).openDatabase("USERDATA", '1.0', "WebSQL Database", 2 * 1024 * 1024);

  }


  list(){
    this.db.transaction((tx) => {
      tx.executeSql("SELECT rowid , * FROM PROFILETABLE", [],
        (tx, result) => {

          console.log('LISt',result);
          console.log('LISt',result['rows']);
          this.datas= result['rows'];
          console.log(this.datas)
          console.log('DATA LOADED SUCCESSFULLY');

        },

        (error) => {

          console.log(error);

          console.log('DATA NOT LOADED');

        });

    });
  }
   Edit_User(item){
    localStorage.setItem('prodata',JSON.stringify(item));
    this.router.navigate(['/pages/profile/edit-profile'])
  }
}
import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'add-employe',
  templateUrl: './add-employe.component.html',

})

export class AddEmployeComponent implements OnInit {
  submit: boolean = false; AddNasForm; id;editdatas;
  db:any ; des;
  constructor(
    private router: Router,
    private alert: ToasterService,

  ) { 
    this.openDB();
    this.id = JSON.parse(localStorage.getItem('empid'));
  }

  get value(){
    return this.AddNasForm.value 
  }

  openDB() {
    this.db = (<any>window).openDatabase("USERDATA", '1.0', "WebSQL Database", 2 * 1024 * 1024);
  }

  createTable() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS USERTABLES (EMP_NAME ,MOB_NUMBER,USER_NAME,USER_PASSWORD,LAST_CHANGE_DATE)', [],
          (tx, result) => {
            console.log('USERTABLE TABLE CREATED');
            resolve(result);
          },
          (error) => {
            console.log('USERTABLE TABLE NOT CREATED');
            reject(error)
          });
      });
    });
  };

  saveData() {
    if(!this.id){
      this.createTable().then(res => {
        console.log('SUCCESS');
        this.db.transaction((tx) => {
          tx.executeSql('INSERT INTO USERTABLES (EMP_NAME,MOB_NUMBER,USER_NAME,USER_PASSWORD,LAST_CHANGE_DATE) VALUES (?,?,?,?,?)',
            [this.value.emp_name, this.value.mob_num, this.value.username, this.value.password, new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()],
            (tx, result) => {
  
              console.log('DATA INSERTED SUCCESSFULLY');
              window.alert('Data Inserted Successfully')
              this.router.navigate(['/pages/employe/list-employe'])
            },
            (error) => {
              console.log(error);
              console.log(tx, 'DATA NOT INSERTED');
            });
        });
      }, err => {
        console.log("FAIL");
      });
    }else{
      this.createTable().then(res => {
        console.log('SUCCESS');
        this.db.transaction((tx) => {
          tx.executeSql('UPDATE USERTABLES SET EMP_NAME =?,MOB_NUMBER =?,USER_NAME = ? where rowid =?',[this.value.emp_name, this.value.mob_num, this.value.username,this.id] ,
            (tx, result) => {
              console.log('DATA Updated SUCCESSFULLY');
              window.alert('Data Updated Successfully')
              this.router.navigate(['/pages/employe/list-employe'])
            },
            (error) => {
              console.log(error);
              console.log(tx, 'DATA NOT INSERTED');
            });
        });
      }, err => {
        console.log("FAIL");
      });
    }
    
  }

  deleteData() {
    this.db.transaction((tx) => {
      tx.executeSql("DELETE FROM USERTABLES WHERE USER_NAME = 'nivviiii' ", [],
        (tx, result) => {
          console.log('DATA DELETED SUCCESSFULLY');
        },
        (error) => {
          console.log(error);
          console.log('DATA NOT DELETED');
        });
    });
  }

  getData() {
    this.db.transaction((tx) => {
      tx.executeSql("SELECT * FROM USERTABLES where rowid = ? ", [this.id],
        (tx, result) => {
          console.log('GET',result);
          this.editdatas = result['rows'][0];
          console.log(this.editdatas);
          
          console.log('DATA LOADED SUCCESSFULLY');
          this.createForm();
        },
        (error) => {
          console.log(error);
          console.log('DATA NOT LOADED');
        });
    });
  }

  ngOnInit() {
    this.createForm();
    if(this.id){
      this.getData()
    }
  }

  createForm() {
    this.AddNasForm = new FormGroup({
      emp_name: new FormControl(this.editdatas ? this.editdatas['EMP_NAME']:''),
      mob_num: new FormControl(this.editdatas ? this.editdatas['MOB_NUMBER']:''),
      username: new FormControl(this.editdatas ? this.editdatas['USER_NAME']:''),
      password: new FormControl(''),
    });
  }
}


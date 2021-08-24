import 'style-loader!angular2-toaster/toaster.css';
import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';



@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {
  db:any;
  submit: boolean = false; AddNasForm; datas; id;


  constructor(

    public activeModal: NgbActiveModal,
    private alert: ToasterService,
    private router : Router
  
  ) { this.openDB();this.createTable() }

  closeModal() {
    // console.log("close")
    this.activeModal.close();
  }

  openDB() {
    this.db = (<any>window).openDatabase("USERDATA", '1.0', "WebSQL Database", 2 * 1024 * 1024);
  }

  ngOnInit() {
    this.createForm();
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

  addEmp() {
    this.createTable().then(res => {
      console.log('SUCCESS');
      this.db.transaction((tx) => {
        tx.executeSql('INSERT INTO USERTABLES (EMP_NAME,MOB_NUMBER,USER_NAME,USER_PASSWORD,LAST_CHANGE_DATE) VALUES (?,?,?,?,?)',
          [this.AddNasForm.value['emp_name'], this.AddNasForm.value['mob_num'], this.AddNasForm.value['username'], this.AddNasForm.value['password'], new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()],
          (tx, result) => {

            console.log('DATA INSERTED SUCCESSFULLY');
            window.alert('Data Inserted Successfully')
            this.closeModal();
            this.router.navigate(['/auth/login'])
          },
          (error) => {
            console.log(error);
            console.log(tx, 'DATA NOT INSERTED');
            window.alert('Data Not Inserted')
          });
      });
    }, err => {
      console.log("FAIL");
    });
  }
  createForm() {
    this.AddNasForm = new FormGroup({
      emp_name: new FormControl(''),
      mob_num : new FormControl(''),
      username : new FormControl(''),
      password: new FormControl(''),
    });
  }
}
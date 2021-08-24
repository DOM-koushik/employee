import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  submit: boolean = false; AddNasForm; db: any;
  constructor(
    private router: Router,
    private alert: ToasterService,
    private nasmodel: NgbModal
  ) { this.openDB(); }

  openDB() {
    this.db = (<any>window).openDatabase("USERDATA", '1.0', "WebSQL Database", 2 * 1024 * 1024);
  }

  get value() {
    return this.AddNasForm.value;
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


  getData() {
    console.log(this.value)
    this.createTable().then(res => {
      console.log('SUCCESS');
      this.db.transaction((tx) => {
        tx.executeSql("SELECT * FROM USERTABLES where USER_NAME = ? AND USER_PASSWORD=? ", [this.value.username, this.value.password],
          (tx, result) => {
            console.log('DATA LOADED SUCCESSFULLY');
            this.router.navigate(['/pages/dashboard'])
            this.createForm();
          },
          (error) => {
            console.log('DATA NOT LOADED');
          });
      });
    }, err => {
      console.log("FAIL");
    });
  }

  ngOnInit() {
    this.createForm();

  }

  signup() {
    const activeModal = this.nasmodel.open(SignupComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Signup';
  }

  createForm() {
    this.AddNasForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITreeOptions } from 'angular-tree-component';
import { toJS } from "mobx";


@Component({
  selector: 'add-profile',
  templateUrl: './add-profile.component.html',
})

export class AddProfileComponent implements OnInit {
  @ViewChild('tree') public tree; db: any;
  submit: boolean = false; AddNasForm; editdata;
  nodes = [
    {
      name: 'Employee',
      children: [
        { id: 100, name: 'List Employe' },
        { id: 101, name: 'Add Employe' },
        { id: 102, name: 'Edit Employe' },
      ]
    },
  ];
  options: ITreeOptions = {
    useCheckbox: true
  };
  constructor(
    private router: Router,
    private alert: ToasterService,


  ) {
    this.openDB();
    this.createTable();
    this.editdata = JSON.parse(localStorage.getItem('prodata'))
    console.log(this.editdata)
  }

  get value() {
    return this.AddNasForm.value
  }

  ngOnInit() {
    this.createForm();
    if(this.editdata){
      this.getprofile();
    }
  }

  async getprofile() {
      // this.selectnodes(this.editdata['PROFILE_ID'])
  }


  selectednodes() {
    const selectedNodes = [];
    Object.entries(toJS(this.tree.treeModel.selectedLeafNodeIds)).forEach(([key, value]) => {
      // console.log(key, value);
      if (value === true) {
        selectedNodes.push(parseInt(key));
      }
    });
    return (selectedNodes);
  }

  selectnodes(item) {
    console.log(item)
    let data = JSON.parse(item);
    let index: number = data.indexOf(404);
    if (index !== -1) {
      data.splice(index, 1);
    }
    for (var i = 0; i < data.length; ++i) {
      let leaf = this.tree.treeModel.getNodeById(JSON.parse(data[i]))
      // console.log(leaf)
      if (leaf)
        leaf.setIsSelected(true);
    }
  }

  openDB() {
    this.db = (<any>window).openDatabase("USERDATA", '1.0', "WebSQL Database", 2 * 1024 * 1024);
  }

  createTable() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS PROFILETABLE (PROFILE_NAME,PROFILE_ID,DESCRIPTION,LAST_CHANGE_DATE)', [],
          (tx, result) => {
            console.log('PROFILETABLE TABLE CREATED');
            resolve(result);
          },
          (error) => {
            console.log('PROFILETABLE TABLE NOT CREATED');
            reject(error)
          });
      });
    });
  };

  addNas() {
    this.value.role = this.selectednodes()
    this.createTable().then(res => {
      console.log('SUCCESS');
      this.db.transaction((tx) => {
        tx.executeSql('INSERT INTO PROFILETABLE (PROFILE_NAME,PROFILE_ID,DESCRIPTION,LAST_CHANGE_DATE) VALUES (?,?,?,?)',
          [this.value.pro_name, this.value.role, this.value.descp, new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()],
          (tx, result) => {

            console.log('DATA INSERTED SUCCESSFULLY');
            window.alert('Data Inserted Successfully')
            this.router.navigate(['/pages/profile/list-profile'])
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

  toastalert(msg, status = 0) {
    const toast: Toast = {
      type: status == 1 ? 'success' : 'warning',
      title: status == 1 ? 'Success' : 'Failure',
      body: msg,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.alert.popAsync(toast);
  }

  getedit() {

  }

  createForm() {
    this.AddNasForm = new FormGroup({
      pro_name: new FormControl('', Validators.required),
      descp: new FormControl(''),
    });
  }
}


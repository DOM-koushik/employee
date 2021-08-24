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
  @ViewChild('tree') public tree;
  submit: boolean = false; AddNasForm; id;
  nodes = [
    {
      name: 'Employee',
      children: [
        { id: 100, name: 'List Employe'},
        { id: 101, name: 'Add Employe' },
        { id: 102, name: 'Edit Employe'},
      ]
    },
  ];
  options: ITreeOptions = {
    useCheckbox: true
  };
  constructor(
    private router: Router,
    private alert: ToasterService,


  ) {  }

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


  addNas() {
    
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

  ngOnInit() {
    this.createForm();
   
  }

  createForm() {
    this.AddNasForm = new FormGroup({
      pro_name: new FormControl('', Validators.required),
      descp: new FormControl(''),
    });
  }
}


import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { icon } from 'leaflet';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {
  role = [];
  constructor() {
    this.menu = [{
      title: 'Dashboard',
      icon: 'fa fa-home',
      link: '/pages/dashboard',
      home: true,
    },
   
    {
      title: 'Employe',
      icon: 'fa fa-briefcase',
      children: [
        {
          title: 'List Employe',
          link: '/pages/employe/list-employe',
        },
        {
          title: 'Add Employe',
          link: '/pages/employe/add-employe',
        },
      ],
    },
    ]
  }
  menu: NbMenuItem[];
}


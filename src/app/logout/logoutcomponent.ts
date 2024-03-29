import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector : 'logout',
    templateUrl: './logoutcomponent.html'
})

export class LogoutComponent implements OnInit {
    submit:boolean=false;
    constructor(
    	private router	: Router,
    	 ){}
    logout(){
    	this.router.navigate(['/auth/login']);
    }
    ngOnInit(){
		this.logout();
	}
}


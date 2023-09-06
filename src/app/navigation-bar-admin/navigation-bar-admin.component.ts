// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar-admin',
  templateUrl: './navigation-bar-admin.component.html',
  styleUrls: ['./navigation-bar-admin.component.css']
})
export class NavigationBarAdminComponent implements OnInit{

  constructor(private router:Router, private userService:UserService){}

  isCollapsed = false;

  visible = false;

  isVisible:boolean;

  open():void{
    this.visible = true;
  }

  close():void{
    this.visible = false;
  }

  ngOnInit(): void {
    this.updateVisibility();
  }

  logout(){
    this.userService.setUserType('guest');
    this.userService.setLoginStatus(false);
    this.router.navigate(["/login"]);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event:any){
    this.updateVisibility();
  }


  updateVisibility(){
    if(window.innerWidth < 992){
      this.isVisible = false;
    }else{
      this.isVisible = true;
    }
  }
}

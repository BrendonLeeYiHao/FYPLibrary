// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit{

  number:any = 5;
  showBtn:boolean = true;
  isLogin:boolean = false;
  constructor(private router:Router, private userService:UserService, private bookService:BookService){}

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLogin = isLoggedIn;
    })

  }

  login(){
    this.showBtn = false;
    this.router.navigate(["/login"]);
  }

  logout(){
    this.toggleMenu();
    this.isLogin = false;
    this.showBtn = true;
    console.log(this.isLogin);
    this.userService.setLoginStatus(false);
    this.router.navigate([""]);

  }

  toggleMenu() {
    var menu = document.getElementById("mobile-menu");
    if (menu!.classList.contains("hidden")) {
      menu!.classList.remove("hidden");
    } else {
      menu!.classList.add("hidden");
    }
  }

  bookingHistory:any = [];

}

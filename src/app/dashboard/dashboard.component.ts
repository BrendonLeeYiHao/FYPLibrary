// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../service/feedback.service';
import { UserService } from '../service/user.service';
import { User } from '../model/userModel';
import { BookService } from '../service/book.service';
import { RoomUsageService } from '../service/room-usage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private feedbackService:FeedbackService, private userService:UserService, private bookService:BookService, private roomUsageService:RoomUsageService){}

  feedbackCount:any;
  pendingApprovalList:User[];
  pendingApprovalCount:number = 0;
  userList:User[];
  bookingList:any[];
  firstMonthCount:any;
  secondMonthCount:any;
  percentage:number = 0;
  greaterThanZero:boolean = true;
  response:any;
  activeCount:number = 0;
  idleCount:number = 0;
  unreadFeedbackCount:number = 0;
  countFirstMonth:number = 0;
  countSecondMonth:number = 0;

  ngOnInit(): void {
    this.getUnreadFeedbackCount();
    this.getPendingApprovalCount();
    this.getActiveAndIdleCount();
    this.getPercentage();
  }

  getUnreadFeedbackCount(){
    this.feedbackService.getUnreadFeedbackCount().subscribe(res=>{
      this.feedbackCount = res;
      this.unreadFeedbackCount = this.feedbackCount.UnreadFeedback;
    })
  }

  getPendingApprovalCount(){
    this.userService.getAllStatusPendingUsers().subscribe(res=>{
      this.pendingApprovalList = res;
      console.log(this.pendingApprovalList.length);
      this.pendingApprovalCount = this.pendingApprovalList.length;
    })
  }

  //to retrieve and compare the active users and idle users in terms of making any booking
  getActiveAndIdleCount(){
    this.userService.getAllUsers().subscribe(res=>{
      this.userList = res;

      this.bookService.getAllDate().subscribe(res=>{
        this.bookingList = res;
      
        this.activeCount = 0;
        this.idleCount = 0;
        for(let i = 0; i < this.userList.length; i++){
          for(let j = 0; j < this.bookingList.length; j++){
            if(this.userList[i].username == this.bookingList[j].Username){
              this.activeCount++;
              break;
            }
          }
        }

        this.idleCount = this.userList.length - this.activeCount;

        console.log("Active Count: " + this.activeCount);
        console.log("Idle Count: " + this.idleCount);
      })
    })
  }

  firstMonth:string = "";
  secondMonth:string = "";

  //compare no of bookings for the previous two months
  getPercentage(){
    const today = new Date();
    console.log(today.getMonth());
    let monthString = (today.getMonth()).toString().padStart(2, '0');
    console.log(monthString);
    const month = new Date(today.getFullYear(), today.getMonth() - 1);
    this.firstMonth = month.toLocaleString('default', { month: 'long' });
    console.log(this.firstMonth);
    this.roomUsageService.getSpecificMonthCount(monthString).subscribe(res=>{
      this.firstMonthCount = res;
      console.log(this.firstMonthCount);
      this.countFirstMonth = this.firstMonthCount.occurrences;
    
      let monthString2 = (today.getMonth() - 1).toString().padStart(2, '0');
      console.log(monthString2);
      const month = new Date(today.getFullYear(), today.getMonth() - 2);
      this.secondMonth = month.toLocaleString('default', { month: 'long' });
      console.log(this.secondMonth);
      this.roomUsageService.getSpecificMonthCount(monthString2).subscribe(res=>{
        this.secondMonthCount = res;
        console.log(this.secondMonthCount);
        this.countSecondMonth = this.secondMonthCount.occurrences;
        this.percentage = parseInt(this.firstMonthCount.occurrences) - parseInt(this.secondMonthCount.occurrences);
        if(parseInt(this.firstMonthCount.occurrences) > parseInt(this.secondMonthCount.occurrences)){
          this.percentage = ((parseInt(this.firstMonthCount.occurrences) - parseInt(this.secondMonthCount.occurrences))/parseInt(this.secondMonthCount.occurrences)) * 100;
          this.greaterThanZero = true;
        }
        else{
          this.percentage = ((parseInt(this.secondMonthCount.occurrences) - parseInt(this.firstMonthCount.occurrences))/parseInt(this.secondMonthCount.occurrences)) * 100;
          this.greaterThanZero = false;
        }
      })
      
    })
  }
}

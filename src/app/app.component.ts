// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';
import emailjs from '@emailjs/browser'
import { BookService } from './service/book.service';
import { Booking } from './model/bookingModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'projecttoday';
  constructor(private router:Router, private bookService:BookService, private datePipe:DatePipe) {
    
  }

  ngOnInit(): void {
    //automated booking reminder - check for possible sending of reminders every hour
    const now = new Date();
    const currentHour = now.getHours();
    if(currentHour === 0){
      this.sendBookingReminder();
    }
    setInterval(() => {
      this.sendBookingReminder();
    }, 3600000);
  }

  public getRouter(): Router{
    return this.router;
  }

  bookingList:Booking[] = [];

  //if clcok turns 12am and there is booking on that day, a booking reminder is sent via email
  sendBookingReminder(){
    const now = new Date();
    var stringDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    const currentHour = now.getHours();
    if(currentHour === 0){
      this.bookService.sendBookingReminderByToday(stringDate).subscribe(res=>{
        this.bookingList = res;
        console.log(this.bookingList);
        if(this.bookingList.length > 0){
          for(let i = 0; i < this.bookingList.length; i++){
            this.sendEmail(this.bookingList[i]);
          }
        }
      })
    }
  }

  sendEmail(newBooking:Booking){
    var params = {
      reminder: "Reminder",
      recipientEmail: "iihaobrendon2001@gmail.com",
      username: newBooking.username,
      roomName: newBooking.roomName,
      bookingDate: newBooking.bookingDate,
      startTime: newBooking.startTime,
      endTime: newBooking.endTime,
    };

    emailjs.send('service_eycok9f', 'template_3qfwil5', params, 'yZebMpS7xHEwXJBlO').then((response)=>{
      console.log('SUCCESS!', response.status, response.text);
    }, (err)=>{
      console.log('FAILED...', err);
    });
  }
}

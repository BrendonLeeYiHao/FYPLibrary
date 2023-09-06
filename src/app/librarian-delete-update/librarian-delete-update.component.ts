// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-librarian-delete-update',
  templateUrl: './librarian-delete-update.component.html',
  styleUrls: ['./librarian-delete-update.component.css']
})
export class LibrarianDeleteUpdateComponent implements OnInit{

  constructor(private bookService:BookService, private datePipe:DatePipe){}

  filterInput:any;

  bookingList:any = [];
  originalBookingList:any = [];
  nowStringDate:any;
  nowStringTime:string;
  response:any;

  ngOnInit(): void {
    const now = new Date();
    this.nowStringDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    var actualMinutes = now.getMinutes();
    this.nowStringTime = now.getHours() + ":" + actualMinutes;
    if((this.nowStringTime.length == 4) && (this.nowStringTime.indexOf(":") == 1)){
      this.nowStringTime = this.nowStringTime.padStart(5, '0');
    }
    else if(((this.nowStringTime.length == 4) && (this.nowStringTime.indexOf(":") == 2)) || (this.nowStringTime.length == 3)){
      const [hours, minutes] = this.nowStringTime.split(':').map(value => value.padStart(2, '0'));
      this.nowStringTime = hours + ":" + minutes;
    }
    console.log(this.nowStringTime);

    this.getAllCompleteBookings();
  }

  getAllCompleteBookings(){
    this.bookService.getAllCompleteBookings().subscribe(res=>{
      this.bookingList = res;
      this.originalBookingList = res.slice();
      console.log(this.bookingList);
    })
  }

  onSortOrderChange(sort: any, key:string):void{
    console.log(sort);
    console.log(key);

    if(sort === null){
      this.bookingList = [...this.originalBookingList];
    }else{
      if(key === 'id'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => {
          const idA = parseInt(a.BookingID.substring(1));
          const idB = parseInt(b.BookingID.substring(1));
          return idA - idB;
        });
      }
      if(key === 'username'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => a.Username.localeCompare(b.Username));
      }
      if(key === 'roomName'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => a.RoomName.localeCompare(b.RoomName));
      }
      if(key === 'roomType'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => a.RoomType.localeCompare(b.RoomType));
      }
      if(key === 'noOfUsers'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => parseInt(a.NoOfUsers) - parseInt(b.NoOfUsers));
      }
      if(key === 'bookingDate'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => a.BookingDate!.localeCompare(b.BookingDate!));
      }
      if(key === 'startTime'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => a.StartTime.localeCompare(b.StartTime));
      }
      if(key === 'endTime'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => a.EndTime.localeCompare(b.EndTime));
      }
      if(key === 'totalPayment'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => parseInt(a.TotalPayment) - parseInt(b.TotalPayment));
      }
      if(key === 'bookingStatus'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => a.BookingStatus.localeCompare(b.BookingStatus));
      }
      if(key === 'feedback'){
        this.bookingList = this.bookingList.sort((a:any, b:any) => a.Feedback.localeCompare(b.Feedback));
      }

      if (sort === 'descend') {
        this.bookingList = this.bookingList.reverse();
      }
    }
  }

  deleteBookingById(bookingId:string){
    Swal.fire({
      title: 'Do you wish to delete booking of ID ' + bookingId,
      icon: 'question',
      showConfirmButton:true,
      confirmButtonColor: 'green',
      confirmButtonText: 'Yes',
      showCloseButton:true,
      showCancelButton:true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){
        this.bookService.deleteBookingById(bookingId).subscribe(res=>{
          this.response = res;
          Swal.fire("Success",this.response, "success");
          this.getAllCompleteBookings();
        })
      }
    })
  }
}

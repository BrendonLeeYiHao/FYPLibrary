// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';
import { RoomService } from '../service/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit{

  constructor(private bookService:BookService, private userService:UserService, private roomService:RoomService, private router:Router){}

  bookingHistory:any = [];
  currentBookings:any = [];
  currentPage = 1;
  response:any;
  viewDetailsVisible:boolean = false;

  ngOnInit(): void {
      this.getCompleteBookingHistory();
  }

  //Prompt for Booking Deletion Confirmation
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
          this.getCompleteBookingHistory();
        })
      }
    })
  }

  roomCozyness:number = 3;
  roomQuietness:number = 3;
  roomComfortness:number = 3;
  roomName:any;
  bookingId:any;
  isVisible:boolean = false;

  provideFeedback(bookingId:string, roomName:string){
    this.isVisible = true;
    this.roomName = roomName;
    this.bookingId = bookingId;
  }

  handleCancel(){
    this.isVisible = false;
    this.roomCozyness = 3;
    this.roomQuietness = 3;
    this.roomComfortness = 3;
  }

  handleOk(){
    console.log(this.bookingId);
    console.log(this.roomCozyness);
    console.log(this.roomQuietness);
    console.log(this.roomComfortness);
    const roomFeedback = {
      bookingId: this.bookingId,
      roomName: this.roomName,
      roomCozyness: this.roomCozyness,
      roomQuietness: this.roomQuietness,
      roomComfortness: this.roomComfortness
    };

    this.roomService.submitRoomFeedback(roomFeedback).subscribe(res=>{
      this.response = res;
      Swal.fire("Success","Thank you for your Feedback &#128522;", "success");
      this.isVisible = false;
      this.roomCozyness = 3;
      this.roomQuietness = 3;
      this.roomComfortness = 3;
      this.getCompleteBookingHistory();
    })
  }

  completeHistoryList:any[] = [];
  originalCompleteHistoryList:any[] = [];

  //Get all bookings based on username
  getCompleteBookingHistory(){
    this.bookService.getCompleteBookingHistory(this.userService.getUsername()).subscribe(res=>{
      this.completeHistoryList = res;
      console.log(this.completeHistoryList);
      this.originalCompleteHistoryList = res.slice();
      if(this.completeHistoryList.length > 0){
        for(let i = 0; i < this.completeHistoryList.length; i++){
          if(this.completeHistoryList[i].equipmentNames == null){
            this.completeHistoryList[i].equipmentNames = "None";
          }
          if(this.completeHistoryList[i].refreshmentNames == null){
            this.completeHistoryList[i].refreshmentNames = "None";
          }
        }
        // this.originalCompleteHistoryList = res.slice();
      } 
    })
  }

  searchQuery:any = '';
  searchDataVisible = false;
  
  //get Filtered Booking based on search filters
  getFilteredHistoryList(){
    this.searchDataVisible = false;
    if(this.searchQuery != ''){
      this.completeHistoryList = this.originalCompleteHistoryList.filter((history) => {
        return history.RoomName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
               history.BookingDate.includes(this.searchQuery);
      })
      if(this.completeHistoryList.length == 0){
        this.searchDataVisible = true;
      }
    }
    else{
      this.completeHistoryList = this.originalCompleteHistoryList;
    }
    
  }

  bookingDetail: {id:string, roomName:string, roomType:string, noOfUsers:number, bookingDate:string, startTime:string, endTime:string, equipmentNames:string, refreshmentNames:string, totalPayment:number, bookingStatus:string};

  viewDetails(history:any){
    this.viewDetailsVisible = true;
    this.bookingDetail = {
      id: history.BookingID,
      roomName: history.RoomName,
      roomType: history.RoomType,
      noOfUsers: history.NoOfUsers,
      bookingDate: history.BookingDate,
      startTime: history.StartTime,
      endTime: history.EndTime,
      equipmentNames: history.equipmentNames,
      refreshmentNames: history.refreshmentNames,
      totalPayment: history.TotalPayment,
      bookingStatus: history.BookingStatus
    }
  }

  closeDetail(){
    this.viewDetailsVisible = false;
  }

}

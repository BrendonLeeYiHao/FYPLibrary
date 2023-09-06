// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Booking } from '../model/bookingModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private SERVER_URL = "http://localhost:80"

  constructor(private httpClient:HttpClient) { }

  public getStartEndDate(formattedDate:Date, roomName:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/booking/getAllByDate.php", {bookingdate: formattedDate, roomName: roomName});
  }

  public getAllDate():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/booking/getAllBooking.php");
  }

  public getBookingId():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/booking/getUniqueBookingId.php");
  }

  public createNewBooking(newBooking:Booking, equipmentList:any[], refreshmentList:any[]):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/booking/createNewBooking.php", {newBooking: newBooking, equipmentList:equipmentList, refreshmentList:refreshmentList});
  }

  public getAllOngoingBookings(bookingStatus:string):Observable<Booking[]>{
    return this.httpClient.post<Booking[]>(this.SERVER_URL + "/angular/booking/getAllOngoingBookings.php", {bookingStatus: bookingStatus}).pipe(
      map((bookingLst: any[]) => {
        return bookingLst.map(booking => {
          return new Booking(booking.BookingID, booking.Username, booking.RoomName, booking.RoomType, booking.NoOfUsers, booking.BookingDate, booking.StartTime, booking.EndTime, booking.TotalPayment, booking.BookingStatus, booking.Feedback);
        });
      })
    );
  }

  public updateBookingStatus(bookingId: string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/booking/updateBookingStatus.php", {bookingId: bookingId});
  }

  public getAllCompleteBookings():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/booking/getAllCompleteBookings.php");
  }

  public deleteBookingById(bookingId:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/booking/deleteBookingById.php", {bookingId:bookingId});
  }

  public checkExistingBooking(username:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/booking/checkExistingBooking.php", {username: username});
  }

  public getBookingHistoryByUsername(username:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/booking/getBookingHistoryByUsername.php", {username:username});
  }

  public getCompleteBookingHistory(username:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/booking/getCompleteBookingHistoryByUsername.php", {username:username});
  }

  public sendBookingReminderByToday(today:string | null):Observable<Booking[]>{
    return this.httpClient.post<Booking[]>(this.SERVER_URL + "/angular/booking/sendBookingReminderByToday.php", {today: today}).pipe(
      map((bookingLst: any[]) => {
        return bookingLst.map(booking => {
          return new Booking(booking.BookingID, booking.Username, booking.RoomName, booking.RoomType, booking.NoOfUsers, booking.BookingDate, booking.StartTime, booking.EndTime, booking.TotalPayment, booking.BookingStatus, booking.Feedback);
        });
      })
    );
  }
}

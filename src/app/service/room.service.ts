// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private SERVER_URL = "http://localhost:80";

  constructor(private httpClient:HttpClient) { }

  getRoomDescription(title:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/room/getRoomDescription.php", {roomNo: title});
  }

  submitRoomFeedback(roomFeedback:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/room/submitRoomFeedback.php", {roomFeedback:roomFeedback});
  }

  getAllRooms():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/room/getAllRooms.php");
  }

  public updateRoom(formData:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/room/updateRoom.php", formData);
  }
}

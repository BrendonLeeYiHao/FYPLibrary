// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.css']
})
export class RoomModalComponent implements OnInit{

  constructor(private roomService:RoomService){}

  @Input() title: string;
  isAvailable:boolean = false;
  
  roomInfo:any = {};
  roomImage:any;
  roomCozyness:number;
  roomQuietness:number;
  roomComfortness:number;

  ngOnInit(): void {
    //obtain room info
    this.roomService.getRoomDescription(this.title).subscribe(res =>{
      this.roomInfo = res;
      console.log(this.roomInfo);
      this.roomImage = this.roomInfo.RoomImage;
      this.isAvailable = true;
      this.roomCozyness = Math.round(parseInt(this.roomInfo.RoomCozyness) / parseInt(this.roomInfo.NoOfFeedback));
      this.roomQuietness = Math.round(parseInt(this.roomInfo.RoomQuietness) / parseInt(this.roomInfo.NoOfFeedback));
      this.roomComfortness = Math.round(parseInt(this.roomInfo.RoomComfortness) / parseInt(this.roomInfo.NoOfFeedback));
    })
  }

}

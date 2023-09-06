// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room-feedback-modal',
  templateUrl: './room-feedback-modal.component.html',
  styleUrls: ['./room-feedback-modal.component.css']
})
export class RoomFeedbackModalComponent {

  @Input() id: string;
  @Input() roomName:string;

  roomCozyness:number = 3;
  roomQuietness:number = 3;
  roomComfortness:number = 3;

  submitRoomFeedback(){
    console.log(this.roomCozyness);
    console.log(this.roomQuietness);
    console.log(this.roomComfortness);

  }
}

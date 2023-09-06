// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { Feedback } from '../model/feedbackModel';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{

  constructor(private feedbackService:FeedbackService){}

  feedbackList:Feedback[];
  originalFeedbackList:Feedback[];
  filterInput:any;
  response:any;

  ngOnInit(): void {
      this.getAllFeedback();
  }

  getAllFeedback(){
    this.feedbackService.getAllFeedback().subscribe(feedbackLst=>{
      this.feedbackList = feedbackLst;
      this.originalFeedbackList = feedbackLst.slice();
    })
  }

  onSortOrderChangeFeedback(sort: any, key:string):void{
    console.log(sort);
    console.log(key);

    if(sort === null){
      this.feedbackList = [...this.originalFeedbackList];
    }else{
      if(key === 'id'){
        this.feedbackList = this.feedbackList.sort((a, b) => a.id - b.id);
      }
      if(key === 'name'){
        this.feedbackList = this.feedbackList.sort((a, b) => a.name.localeCompare(b.name));
      }
      if(key === 'email'){
        this.feedbackList = this.feedbackList.sort((a, b) => a.email.localeCompare(b.email));
      }
      if(key === 'comment'){
        this.feedbackList = this.feedbackList.sort((a, b) => a.comment.localeCompare(b.comment));
      }
      if(key === 'date'){
        this.feedbackList = this.feedbackList.sort((a, b) => a.date.localeCompare(b.date));
      }

      if (sort === 'descend') {
        this.feedbackList = this.feedbackList.reverse();
      }
    }
  }

  updateMarkAsRead(id:number){
    this.feedbackService.updateMarkAsRead(id).subscribe(res=>{
      this.response = res;
      this.getAllFeedback();
    })
  }
}

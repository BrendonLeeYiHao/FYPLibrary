// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Feedback } from '../model/feedbackModel';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private SERVER_URL = "http://localhost:80"

  constructor(private httpClient:HttpClient) { }

  public submitFeedback(newFeedback:Feedback):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/feedback/submitFeedback.php", {newFeedback: newFeedback});
  }

  public getAllFeedback():Observable<Feedback[]>{
    return this.httpClient.get<Feedback[]>(this.SERVER_URL + "/angular/feedback/getAllFeedback.php").pipe(
      map((feedbackLst: any[]) => {
        return feedbackLst.map(feedback => {
          return new Feedback(feedback.ID, feedback.Name, feedback.Email, feedback.Comment, feedback.Date, feedback.MarkAsRead);
        });
      })
    );
  }

  public updateMarkAsRead(id:number){
    return this.httpClient.post(this.SERVER_URL + "/angular/feedback/updateMarkAsRead.php",{id: id});
  }

  public getUnreadFeedbackCount(){
    return this.httpClient.get(this.SERVER_URL + "/angular/feedback/getUnreadFeedbackCount.php");
  }
}

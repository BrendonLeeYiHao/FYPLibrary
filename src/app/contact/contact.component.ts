// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../model/feedbackModel';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { FeedbackService } from '../service/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  feedbackForm:FormGroup;
  response:any;
  stringDate:any;

  constructor(private fb:FormBuilder, private feedbackService:FeedbackService, private datePipe:DatePipe){
    this.feedbackForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern("^(?!.*[^a-zA-Z ])(?=[A-Z].*)(?!.* {2}.*)(?!.*[A-Z]{2}.*)(?!.*[a-z][A-Z].*)(?!.*[A-Z] .*)(?!.* [a-z].*).{2,79}[a-z]$")]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(80)]],
      comment: [null, [Validators.required, Validators.pattern("^(?!\\s).*$"), Validators.maxLength(200)]]
    })
  }

  submitFeedback(){
    if(this.feedbackForm.valid){
      const today = new Date();
      this.stringDate = this.datePipe.transform(today, 'yyyy-MM-dd');
      const newFeedback:Feedback = {
        id: 0,
        name: this.feedbackForm.value.name,
        email: this.feedbackForm.value.email,
        comment: this.feedbackForm.value.comment,
        date: this.stringDate,
        read: false
      }
      this.feedbackService.submitFeedback(newFeedback).subscribe(res=>{
        this.response = res;
        Swal.fire("Success", this.response, "success");
        this.feedbackForm.reset();
      })
    }
    else{
      Object.values(this.feedbackForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
    
  }
}

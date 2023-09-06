// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/userModel';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-public',
  templateUrl: './register-public.component.html',
  styleUrls: ['./register-public.component.css']
})
export class RegisterPublicComponent implements OnInit{



  constructor(private fb: UntypedFormBuilder, private userService:UserService, private datePipe:DatePipe){
    this.registerPublicForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern("^(?!.*[^a-zA-Z ])(?=[A-Z].*)(?!.* {2}.*)(?!.*[A-Z]{2}.*)(?!.*[a-z][A-Z].*)(?!.*[A-Z] .*)(?!.* [a-z].*).{2,79}[a-z]$")]],
      username: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{3,80}$"), (control: AbstractControl<any, any>) => this.uniqueUsername(control, this.existingUsername)]],
      password: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?!.*\\s)(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$")]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(80), (control: AbstractControl<any, any>) => this.uniqueEmail(control, this.existingEmail)]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0][1][0-1]-[0-9]{7,8}$|^[0][1][2-9]-[0-9]{7}$'), (control: AbstractControl<any, any>) => this.uniquePhone(control, this.existingPhone)]],
      dob: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    })
  }

  registerPublicForm !: UntypedFormGroup;
  registerAPUForm !: UntypedFormGroup;
  response:any;
  showDate:Date;

  existingDetails:User[] = [];
  existingUsername:string[] = [];
  existingEmail:string[] = [];
  existingPhone:string[] = [];

  passwordVisible = false;

  ngOnInit(): void {
      this.getExistingAccountDetails();
      const today = new Date();
      const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1);
      this.showDate = minDate;
  }

  getExistingAccountDetails(){
    this.userService.getAllUsers().subscribe(res=>{
      this.existingDetails = res;
      this.existingUsername = this.existingDetails.map(user => user.username);
      this.existingEmail = this.existingDetails.map(user => user.email);
      this.existingPhone = this.existingDetails.map(user => user.phoneNumber);
    })

  }

  uniqueUsername(control: AbstractControl, existingUsername:string[]): {[key:string]:any} | null{
    const username = control.value;  
    if(existingUsername.includes(username)){
      return { uniqueUsername: true};
    }
    return null;
  }

  uniqueEmail(control: AbstractControl, existingEmail:string[]): {[key:string]:any} | null{
    const email = control.value;  
    if(existingEmail.includes(email)){
      return { uniqueEmail: true};
    }
    return null;
  }

  uniquePhone(control: AbstractControl, existingPhone:string[]): {[key:string]:any} | null{
    const phone = control.value;  
    if(existingPhone.includes(phone)){
      return { uniquePhone: true};
    }
    return null;
  }

  registerPublic(){
    if(this.registerPublicForm.valid){ 
      const newUser: User = {
        id: 0,
        userType: "Public User",
        name: this.registerPublicForm.value.name,
        username: this.registerPublicForm.value.username,
        tpNoStaffId: null,
        password: this.registerPublicForm.value.password,
        email: this.registerPublicForm.value.email,
        phoneNumber: this.registerPublicForm.value.phoneNumber,
        dob: this.datePipe.transform(this.registerPublicForm.value.dob, 'yyyy-MM-dd'),
        gender: this.registerPublicForm.value.gender,
        status: "Pending"
      }

      this.userService.registerAllUsers(newUser).subscribe(res=>{
        this.response = res;
        Swal.fire("Success", this.response + " Kindly wait for approval from admin", "success");
        this.registerPublicForm.reset();
        this.getExistingAccountDetails();
      })
    }
    else{
      Object.values(this.registerPublicForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
  }

  
  disabledDate = (current: Date): boolean => {
    //Ensure user is at least 18 years old
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1);

    return current.getTime() > minDate.getTime();
  }
}

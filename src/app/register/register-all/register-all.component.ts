// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/userModel';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-all',
  templateUrl: './register-all.component.html',
  styleUrls: ['./register-all.component.css']
})
export class RegisterAllComponent {

  existingDetails:User[] = [];
  existingUsername:string[] = [];
  existingIdentity:any[] = [];
  existingEmail:string[] = [];
  existingPhone:string[] = [];

  passwordVisible = false;

  getExistingAccountDetails(){
    this.userService.getAllUsers().subscribe(res=>{
      this.existingDetails = res;
      this.existingUsername = this.existingDetails.map(user => user.username);
      this.existingIdentity = this.existingDetails.filter(user => user.tpNoStaffId != null).map(user => user.tpNoStaffId)
      this.existingEmail = this.existingDetails.map(user => user.email);
      this.existingPhone = this.existingDetails.map(user => user.phoneNumber);
      console.log(this.existingPhone);
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

  uniqueIdentity(control: AbstractControl, existingIdentity:any[]): {[key:string]:any} | null{
    const identity = control.value; 
    if(existingIdentity.includes(identity)){
      return { uniqueIdentity: true};
    }
    return null;
  }


  constructor(private fb: UntypedFormBuilder, private userService:UserService, private datePipe:DatePipe){
    this.registerAPUForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern("^(?!.*[^a-zA-Z ])(?=[A-Z].*)(?!.* {2}.*)(?!.*[A-Z]{2}.*)(?!.*[a-z][A-Z].*)(?!.*[A-Z] .*)(?!.* [a-z].*).{2,79}[a-z]$")]],
      username: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{3,80}$"), (control: AbstractControl<any, any>) => this.uniqueUsername(control, this.existingUsername)]],
      tpNoStaffId: [null, [Validators.required, Validators.pattern("^[T][P][0-9]{6}$|^[S][N][0-9]{6}$"), (control: AbstractControl<any, any>) => this.uniqueIdentity(control, this.existingIdentity)]],
      password: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?!.*\\s)(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$")]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(80), (control: AbstractControl<any, any>) => this.uniqueEmail(control, this.existingEmail)]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0][1][0-1]-[0-9]{7,8}$|^[0][1][2-9]-[0-9]{7}$'), (control: AbstractControl<any, any>) => this.uniquePhone(control, this.existingPhone)]],
      dob: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    })
    
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
  showDate:any;

  ngOnInit(): void {
    this.getExistingAccountDetails();
    console.log(this.existingPhone);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1);
    this.showDate = minDate;
  }

  registerStudentStaff(){
    if(this.registerAPUForm.valid){ 
      const newUser: User = {
        id: 0,
        userType: "APU Student/Staff",
        name: this.registerAPUForm.value.name,
        username: this.registerAPUForm.value.username,
        tpNoStaffId: this.registerAPUForm.value.tpNoStaffId,
        password: this.registerAPUForm.value.password,
        email: this.registerAPUForm.value.email,
        phoneNumber: this.registerAPUForm.value.phoneNumber,
        dob: this.datePipe.transform(this.registerAPUForm.value.dob, 'yyyy-MM-dd'),
        gender: this.registerAPUForm.value.gender,
        status: "Approved"
      }
      this.userService.registerAllUsers(newUser).subscribe(res=>{
        this.response = res;
        Swal.fire("Success", this.response, "success");
        this.registerAPUForm.reset();
        this.getExistingAccountDetails();
      })
    }else{
      Object.values(this.registerAPUForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
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
        status: "Approved"
      }

      this.userService.registerAllUsers(newUser).subscribe(res=>{
        this.response = res;
        Swal.fire("Success", this.response, "success");
        this.registerPublicForm.reset();
        this.getExistingAccountDetails();
      })
    }else{
      Object.values(this.registerPublicForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
  }


  register(){
    if(this.registerAPUForm.valid){
      Swal.fire("Success","Form inputs are all valid", "success");
      console.log(this.registerAPUForm.value);
    }else{
      Swal.fire("Failure","Invalid","error");
    }

  }

  disabledDate = (current: Date): boolean => {
    //Ensure user is at least 18 years old
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1);
    return current.getTime() > minDate.getTime();
  }
}

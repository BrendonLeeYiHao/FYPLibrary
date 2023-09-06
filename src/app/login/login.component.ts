// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoomService } from '../service/room.service';
import { User } from '../model/userModel';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  isLogin:boolean = false;
  validateForm!: UntypedFormGroup;

  passwordVisible = false;
  isVisible:boolean = false;
  retrievePasswordForm:FormGroup;
  response:any;
  retrievedResponse:any;

  submitForm(){
    if(this.validateForm.valid){
      console.log(this.validateForm.value);
      this.userService.login(this.validateForm.value).subscribe(res=>{
        this.response = res;
        console.log(this.response);
        if(this.response == "Correct and Approved"){
          if(this.validateForm.controls['userType'].value == "APU Librarian"){
            this.userService.setUserType("APU Librarian");
            this.userService.setUsername(this.validateForm.value.username);
            this.userService.setLoginStatus(true);
            this.router.navigate(["/admin/dashboard"]);
          }
          else if(this.validateForm.controls['userType'].value == "APU Student/Staff"){
            this.userService.setUserType("APU Student/Staff");
            this.userService.setUsername(this.validateForm.value.username);
            this.userService.setLoginStatus(true);
            this.router.navigate([""]);
          }
          else if(this.validateForm.controls['userType'].value == "Public User"){
            this.userService.setUserType("Public User");
            this.userService.setUsername(this.validateForm.value.username);
            this.userService.setLoginStatus(true);
            this.router.navigate([""]);
          }
        }
        else if(this.response == "Pending"){
          Swal.fire("Warning","Your account is pending to be approved!","warning");
        }
        else if(this.response == "Rejected"){
          Swal.fire("Warning","Your account is rejected, Kindly contact the admin for more information!","warning");
        }
        else{
          Swal.fire("Error","Incorrect Credentials! Pls try again!","error");
        }
      })
    }
    else{  
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Incorrect Credentials! Pls try again!","error");
        }
      }); 
    }
  }

  constructor(private fb: UntypedFormBuilder, private userService:UserService, private router:Router, private modalService:NzModalService, private roomService:RoomService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      userType: ['APU Student/Staff'],
      remember: [true]
    });
  }

  initializeRetrieveForm(){
    this.retrievePasswordForm = this.fb.group({
      email: [null, [Validators.required]]
    })
  }

  openModal(){
    this.isVisible = true;
    this.initializeRetrieveForm();
    this.getAllUsers();
  }

  handleCancel(){
    this.isVisible = false;
  }

  userList:User[];
  userDetail:User[];

  getAllUsers(){
    this.userService.getAllUsers().subscribe(res=>{
      this.userList = res;
      console.log(this.userList);
    })
  }

  handleOk(){
    if(this.retrievePasswordForm.valid){
      this.userDetail = this.userList.filter(user => user.email == this.retrievePasswordForm.value.email);
      if(this.userDetail.length > 0){
        const newPassword = {
          id: this.userDetail[0].id,
          username: this.userDetail[0].username,
          password: this.generatePassword()
        }
        console.log(newPassword);
        this.userService.resetPassword(newPassword).subscribe(res=>{
          this.response = res;
          this.sendEmail(newPassword);
          Swal.fire("Success", this.response, "success");   
          this.isVisible = false;
        })
      }
      else{
        Swal.fire("Error", "Email you entered does not exist", "error");
      }
    }
    else{
      Object.values(this.retrievePasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the email!","error");
        }
      }); 
    }
  }
  
  sendEmail(passwordInfo:any){
    var params = {
      recipientEmail: "iihaobrendon2001@gmail.com",
      username: passwordInfo.username,
      password: passwordInfo.password
    };

    emailjs.send('service_eycok9f', 'template_sc187iq', params, 'yZebMpS7xHEwXJBlO').then((response)=>{
      console.log('SUCCESS!', response.status, response.text);
    }, (err)=>{
      console.log('FAILED...', err);
    });
   
  }

  newPassword:any;

  generatePassword():string{
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*-';

    let password = '';

    // Generate random characters for each requirement
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));

    // Generate remaining random characters
    const remainingLength = 8 - password.length; // Adjust the length as desired
    const characters = uppercase + lowercase + numbers + symbols;

    for (let i = 0; i < remainingLength; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    console.log(password);
    return password;
  }
}

// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/userModel';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor(private fb:FormBuilder, private userService:UserService){
    this.originalForm = this.fb.group({
      id: [null],
      name: [null],
      username: [null],
      tpNoStaffId: [null],
      email: [null],
      phoneNumber: [null],
      dob: [null],
      gender: [null]
    });
  }
  updatedForm:FormGroup;
  originalForm:FormGroup;
  passwordForm:FormGroup;

  existingDetails:User[] = [];
  existingEmail:string[] = [];
  existingPhone:string[] = [];
  originalEmail:string = "";
  originalPhone:string = "";
  userProfile:any;
  response:any;
  isVisible:boolean = false;
  passwordVisible:boolean = true;
  userType:string;

  ngOnInit(): void {
    this.userType = this.userService.getUserType();
    this.getUserByUsername();
    this.getExistingAccountDetails();
    this.refreshPasswordForm();
  }

  getUserByUsername(){
    this.userService.getUserByUsername(this.userService.getUsername()).subscribe(res=>{
      this.userProfile = res;
      console.log(this.userProfile);
      this.originalForm.controls['id'].setValue(this.userProfile.ID);
      this.originalForm.controls['name'].setValue(this.userProfile.Name);
      this.originalForm.controls['username'].setValue(this.userProfile.Username);
      this.originalForm.controls['tpNoStaffId'].setValue(this.userProfile.TpNoStaffId);
      this.originalForm.controls['email'].setValue(this.userProfile.Email);
      this.originalForm.controls['phoneNumber'].setValue(this.userProfile.PhoneNumber);
      this.originalForm.controls['dob'].setValue(this.userProfile.Dob);
      this.originalForm.controls['gender'].setValue(this.userProfile.Gender);

    })
  }

  getExistingAccountDetails(){
    this.userService.getAllUsers().subscribe(res=>{
      this.existingDetails = res;
      this.existingEmail = this.existingDetails.map(user => user.email);
      this.existingPhone = this.existingDetails.map(user => user.phoneNumber);
      this.initializeForm();
    })

  }

  initializeForm(){
    this.updatedForm = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(80), (control: AbstractControl<any, any>) => this.uniqueEmail(control, this.existingEmail)]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0][1][0-1]-[0-9]{7,8}$|^[0][1][2-9]-[0-9]{7}$'), (control: AbstractControl<any, any>) => this.uniquePhone(control, this.existingPhone)]]
    });
  }

  //reset Update Profile Form after submitted
  refreshForm(){
    this.originalForm = this.fb.group({
      id: [null],
      name: [null],
      username: [null],
      tpNoStaffId: [null],
      email: [null],
      phoneNumber: [null],
      dob: [null],
      gender: [null]
    });
  }

  refreshPasswordForm(){
    this.passwordForm = this.fb.group({
      password: [null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?!.*\\s)(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$")]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]]
    })
  }

  uniqueEmail(control: AbstractControl, existingEmail:string[] | undefined): {[key:string]:any} | null{
    const email = control.value;  
    if(existingEmail && existingEmail.includes(email)){
      if(email == this.originalEmail){
        return null;
      }
      return { uniqueEmail: true};
    }
    return null;
  }

  uniquePhone(control: AbstractControl, existingPhone:string[] | undefined): {[key:string]:any} | null{
    const phone = control.value;  
    if(existingPhone && existingPhone.includes(phone)){
      if(phone == this.originalPhone){
        return null;
      }
      return { uniquePhone: true};
    }
    return null;
  }

  confirmUpdate(){
    if(this.updatedForm.valid){
      console.log("Work");
      const updatedAccount = {
        id: this.updatedForm.value.id,
        email: this.updatedForm.value.email,
        phoneNumber: this.updatedForm.value.phoneNumber
      };

      this.userService.updateAccount(updatedAccount).subscribe(res=>{
        this.response = res;
        Swal.fire("Success", this.response, "success");    
      })
    }
    else{
      Object.values(this.updatedForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
  }

  handleCancel(){
    this.isVisible = false;
    this.initializeForm();
  }

  handleOk(){
    if(this.updatedForm.valid){
      console.log("Work");
      const updatedAccount = {
        id: this.originalForm.value.id,
        email: this.updatedForm.value.email,
        phoneNumber: this.updatedForm.value.phoneNumber
      };

      this.userService.updateAccount(updatedAccount).subscribe(res=>{
        this.response = res;
        Swal.fire("Success", this.response, "success"); 
        this.isVisible = false;
        this.originalForm.controls['email'].setValue(this.updatedForm.value.email);
        this.originalForm.controls['phoneNumber'].setValue(this.updatedForm.value.phoneNumber);
        this.getExistingAccountDetails();
      })
    }
    else{
      Object.values(this.updatedForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
    
  }

  openUpdateModal(){
    this.isVisible = true;
    this.originalEmail = this.originalForm.value.email;
    this.updatedForm.controls['email'].setValue(this.originalForm.value.email);
    this.originalPhone = this.originalForm.value.phoneNumber;
    this.updatedForm.controls['phoneNumber'].setValue(this.originalForm.value.phoneNumber);
  }


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.passwordForm.controls['confirmPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control:FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.passwordForm.value.password) {
      return { confirm: true, error: true };
    }
    return {};
  };


  updatePassword(){
    if(this.passwordForm.valid){
      const updatedPassword = {
        id: this.originalForm.value.id,
        username: this.originalForm.value.username,
        password: this.passwordForm.value.password
      }
      this.userService.updatePassword(updatedPassword).subscribe(res=>{
        this.response = res;
        Swal.fire("Success", this.response, "success");
        this.passwordForm.reset();
      })
    }
    else{
      Object.values(this.passwordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
  }
}

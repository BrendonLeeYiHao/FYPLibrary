// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/userModel';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-delete',
  templateUrl: './update-delete.component.html',
  styleUrls: ['./update-delete.component.css']
})
export class UpdateDeleteComponent {

  updatedForm:FormGroup;

  existingDetails:User[] = [];
  existingEmail:string[] = [];
  existingPhone:string[] = [];

  getExistingAccountDetails(){
    this.userService.getAllUsers().subscribe(res=>{
      this.existingDetails = res;
      this.existingEmail = this.existingDetails.map(user => user.email);
      this.existingPhone = this.existingDetails.map(user => user.phoneNumber);
      console.log(this.existingPhone);
      this.initializeForm();
    })

  }

  initializeForm(){
    this.updatedForm = this.fb.group({
      id: [null],
      name: [null],
      username: [null],
      tpNoStaffId: [null],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(80), (control: AbstractControl<any, any>) => this.uniqueEmail(control, this.existingEmail)]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0][1][0-1]-[0-9]{7,8}$|^[0][1][2-9]-[0-9]{7}$'), (control: AbstractControl<any, any>) => this.uniquePhone(control, this.existingPhone)]],
      dob: [null],
      gender: [null]
    })
  }

  //to check for email uniqueness
  uniqueEmail(control: AbstractControl, existingEmail:string[] | undefined): {[key:string]:any} | null{
    const email = control.value;  
    if(existingEmail && existingEmail.includes(email)){
      if(email == this.originalEmail){    //same as the original email, considered valid
        return null;
      }
      return { uniqueEmail: true};
    }
    return null;
  }

  //to check for phone uniqueness
  uniquePhone(control: AbstractControl, existingPhone:string[] | undefined): {[key:string]:any} | null{
    const phone = control.value;  
    if(existingPhone && existingPhone.includes(phone)){
      if(phone == this.originalPhone){    //same as the original phone, considered valid
        return null;
      }
      return { uniquePhone: true};
    }
    return null;
  }

  constructor(private userService:UserService, private fb:FormBuilder){

  }

  filterInput:any;

  ngOnInit(): void {
      this.getExistingAccountDetails();
      this.getAllAPUUsers();
      this.getAllPublicUsers();
  }

  APUuserList:User[];
  publicUserList:User[];
  sortData:any;
  originalPublicUserList:User[];
  originalAPUuserList:User[];

  getAllAPUUsers(){
    this.userService.getUsersByUserType("APU").subscribe((APUuserLst) => {
      this.APUuserList = APUuserLst;
      this.originalAPUuserList = APUuserLst.slice();
      console.log(this.APUuserList);
    })
  }

  getAllPublicUsers(){
    this.userService.getUsersByUserType("Non-APU").subscribe((publicUserLst) => {
      this.publicUserList = publicUserLst;
      this.originalPublicUserList = publicUserLst.slice();
      console.log(this.originalPublicUserList);
    })
  }

  //sort columns
  onSortOrderChangePublic(sort: any, key:string):void{
    console.log(sort);
    console.log(key);

    if(sort === null){
      this.publicUserList = [...this.originalPublicUserList];
    }else{
      if(key === 'id'){
        this.publicUserList = this.publicUserList.sort((a, b) => a.id - b.id);
      }
      if(key === 'name'){
        this.publicUserList = this.publicUserList.sort((a, b) => a.name.localeCompare(b.name));
      }
      if(key === 'username'){
        this.publicUserList = this.publicUserList.sort((a, b) => a.username.localeCompare(b.username));
      }
      if(key === 'email'){
        this.publicUserList = this.publicUserList.sort((a, b) => a.email.localeCompare(b.email));
      }
      if(key === 'phone'){
        this.publicUserList = this.publicUserList.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber));
      }
      if(key === 'dob'){
        this.publicUserList = this.publicUserList.sort((a, b) => a.dob!.localeCompare(b.dob!));
      }
      if(key === 'gender'){
        this.publicUserList = this.publicUserList.sort((a, b) => a.gender.localeCompare(b.gender));
      }

      if (sort === 'descend') {
        this.publicUserList = this.publicUserList.reverse();
      }
    }
  }


  onSortOrderChangeAPU(sort: any, key:string):void{
    console.log(sort);
    console.log(key);

    if(sort === null){
      this.APUuserList = [...this.originalAPUuserList];
    }else{
      if(key === 'id'){
        this.APUuserList = this.APUuserList.sort((a, b) => a.id - b.id);
      }
      if(key === 'name'){
        this.APUuserList = this.APUuserList.sort((a, b) => a.name.localeCompare(b.name));
      }
      if(key === 'username'){
        this.APUuserList = this.APUuserList.sort((a, b) => a.username.localeCompare(b.username));
      }
      if(key === 'tpNoStaffId'){
        this.APUuserList = this.APUuserList.sort((a, b) => a.tpNoStaffId!.localeCompare(b.tpNoStaffId!));
      }
      if(key === 'email'){
        this.APUuserList = this.APUuserList.sort((a, b) => a.email.localeCompare(b.email));
      }
      if(key === 'phone'){
        this.APUuserList = this.APUuserList.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber));
      }
      if(key === 'dob'){
        this.APUuserList = this.APUuserList.sort((a, b) => a.dob!.localeCompare(b.dob!));
      }
      if(key === 'gender'){
        this.APUuserList = this.APUuserList.sort((a, b) => a.gender.localeCompare(b.gender));
      }

      if (sort === 'descend') {
        this.APUuserList = this.APUuserList.reverse();
      }
    }
  }

  isVisible = false;
  showIdentity = false;
  originalEmail:any;
  originalPhone:any;

  openUpdateModal(user:User){
    this.isVisible = true;
    if(user.userType == 'Public User'){
      this.showIdentity = false;
    }
    else{
      this.showIdentity = true;
    }

    this.updatedForm.controls['id'].setValue(user.id);
    this.updatedForm.controls['name'].setValue(user.name);
    this.updatedForm.controls['username'].setValue(user.username);
    this.updatedForm.controls['tpNoStaffId'].setValue(user.tpNoStaffId);
    this.updatedForm.controls['email'].setValue(user.email);
    this.originalEmail = this.updatedForm.value.email;
    this.updatedForm.controls['phoneNumber'].setValue(user.phoneNumber);
    this.originalPhone = this.updatedForm.value.phoneNumber;
    this.updatedForm.controls['dob'].setValue(user.dob);
    this.updatedForm.controls['gender'].setValue(user.gender);
  }

  response:any;

  openDeleteModal(id:number){
    Swal.fire({
      title: 'Do you wish to delete account of ID ' + id,
      icon: 'question',
      showConfirmButton:true,
      confirmButtonColor: 'green',
      confirmButtonText: 'Yes',
      showCloseButton:true,
      showCancelButton:true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No'
    }).then((result) =>{
      if(result.isConfirmed){
        this.userService.deleteAccount(id).subscribe(res=>{
          this.response = res;
          Swal.fire('Success',this.response,"success");
          this.getExistingAccountDetails();
          this.getAllAPUUsers();
          this.getAllPublicUsers();
        })
      }
    })
  }

  handleCancel(){
    this.isVisible = false;
    this.initializeForm();
  }

  handleOk(){
    if(this.updatedForm.valid){
      const updatedAccount = {
        id: this.updatedForm.value.id,
        email: this.updatedForm.value.email,
        phoneNumber: this.updatedForm.value.phoneNumber
      };

      this.userService.updateAccount(updatedAccount).subscribe(res=>{
        this.response = res;
        Swal.fire("Success", this.response, "success");    
        this.getExistingAccountDetails();
        this.getAllAPUUsers();
        this.getAllPublicUsers();
        
        this.isVisible = false;
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
  
}

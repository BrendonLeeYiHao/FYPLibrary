//Developer Name: Brendon Lee Yi Hao
//Course Name: BSc (Hons) Software Engineering
//Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/userModel';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.component.html',
  styleUrls: ['./approve-reject.component.css']
})
export class ApproveRejectComponent implements OnInit{

  constructor(private userService:UserService){}

  response:any;

  ngOnInit(): void {
      this.getAllPendingStatusUsers();
  }

  userList:User[];

  getAllPendingStatusUsers(){
    this.userService.getAllStatusPendingUsers().subscribe((userLst) => {
      this.userList = userLst;
      console.log(this.userList);
    })
  }

  approveAccount(id: number){
    this.userService.approveAccount(id).subscribe(res => {
      this.response = res;
      Swal.fire("Success", this.response, "success");
      this.getAllPendingStatusUsers();
    })
  }

  rejectAccount(id: number){
    this.userService.rejectAccount(id).subscribe(res=>{
      this.response = res;
      Swal.fire("Success", this.response, "success");
      this.getAllPendingStatusUsers();
    })
  }

}

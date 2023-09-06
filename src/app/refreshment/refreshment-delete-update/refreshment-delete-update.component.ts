// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Refreshment } from 'src/app/model/refreshmentModel';
import { RefreshmentService } from 'src/app/service/refreshment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refreshment-delete-update',
  templateUrl: './refreshment-delete-update.component.html',
  styleUrls: ['./refreshment-delete-update.component.css']
})
export class RefreshmentDeleteUpdateComponent implements OnInit{

  constructor(private refreshmentService:RefreshmentService, private fb:FormBuilder){

  }

  refreshmentForm:FormGroup;

  isVisible = false;

  response:any;

  ngOnInit(): void {
      this.getAllRefreshment();
      this.initializeForm();
  }

  initializeForm(){
    this.refreshmentForm = this.fb.group({
      id: [null],
      name: [null],
      price: [null, [Validators.required, Validators.pattern('^[0-9]{1,2}(\.[0-9]{2})?$')]],
      stock: [null, [Validators.required, Validators.max(10000), Validators.pattern('^[0-9]+$')]],
    })
  }

  refreshmentList:Refreshment[];

  getAllRefreshment(){
    this.refreshmentService.getAllRefreshment().subscribe((refreshmentLst) => {
      this.refreshmentList = refreshmentLst;
    })
  }


  openUpdateModal(refreshment:Refreshment){
    this.isVisible = true;
    this.refreshmentForm.controls['id'].setValue(refreshment.id);
    this.refreshmentForm.controls['name'].setValue(refreshment.name);
    this.refreshmentForm.controls['price'].setValue(refreshment.price);
    this.refreshmentForm.controls['stock'].setValue(refreshment.stock);
  }


  handleCancel(){
    this.isVisible = false;
    this.initializeForm();
  }

  handleOk(){
    if(this.refreshmentForm.valid){
      const updatedRefreshment: Refreshment = {
        id: this.refreshmentForm.value.id,
        name: this.refreshmentForm.value.name,
        price: this.refreshmentForm.value.price,
        stock: this.refreshmentForm.value.stock
      };

      this.refreshmentService.updateRefreshment(updatedRefreshment).subscribe(res=>{
        this.response = res;
        console.log(this.response);
        Swal.fire("Success", this.response, "success");
        this.getAllRefreshment();
        this.initializeForm();
        this.isVisible = false;
      })
    }
    else{
      Object.values(this.refreshmentForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
  }

  openDeleteModal(refreshmentId:string){
    Swal.fire({
      title: 'Do you wish to delete refreshment of ID ' + refreshmentId,
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
        this.refreshmentService.deleteRefreshment(refreshmentId).subscribe(res=>{
          this.response = res;
          Swal.fire('Success',this.response,"success");
          this.getAllRefreshment();
          this.initializeForm();
        })
      }
    })
  }
}

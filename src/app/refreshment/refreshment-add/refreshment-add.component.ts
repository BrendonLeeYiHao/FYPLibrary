// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Refreshment } from 'src/app/model/refreshmentModel';
import { RefreshmentService } from 'src/app/service/refreshment.service';
import { RandomService } from 'src/app/shared-service/random.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refreshment-add',
  templateUrl: './refreshment-add.component.html',
  styleUrls: ['./refreshment-add.component.css']
})
export class RefreshmentAddComponent implements OnInit{

  refreshmentForm : FormGroup;
  response:any;
  uniqueId:any;

  constructor(private refreshmentService:RefreshmentService, private fb:FormBuilder, private randService:RandomService){
    this.refreshmentForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern("^(?! )(?!.* {2}.*)[a-zA-Z0-9\\s]{2,49}[a-zA-Z0-9]$"), (control: AbstractControl<any, any>) => this.uniqueName(control, this.existingName)]], //i will take from my own one
      price: [null, [Validators.required, Validators.pattern('^[0-9]{1,2}(\.[0-9]{2})?$')]],
      stock: [null, [Validators.required, Validators.max(10000), Validators.pattern('^[0-9]+$')]],
    })
  }

  uniqueRefreshmentId:string;

  ngOnInit(): void {
    this.generateUniqueRefreshmentId();
    this.getAllRefreshment();
  }

  uniqueName(control: AbstractControl, existingName:string[]): {[key:string]:any} | null{
    const name = control.value;  
    if(existingName.includes(name)){
      return { uniqueName: true};
    }
    return null;
  }

  generateUniqueRefreshmentId(){
    this.refreshmentService.getRefreshmentId().subscribe(res => {
      this.uniqueId = res;
      if(this.uniqueId.RefreshmentID == null){
        this.uniqueRefreshmentId = "R001";
      }
      else{
        const numericPart = this.uniqueId.RefreshmentID.toString().substr(1);
        const incrementedNumber = parseInt(numericPart, 10) + 1;
        const formattedNumber = incrementedNumber.toString().padStart(numericPart.length, "0");
        this.uniqueRefreshmentId = "R" + formattedNumber;
        console.log(this.uniqueRefreshmentId);
      }
    })
  }

  createRefreshment(){
    if(this.refreshmentForm.valid){
      const newRefreshment: Refreshment = {
        id: this.uniqueRefreshmentId,
        name: this.refreshmentForm.value.name,
        price: this.refreshmentForm.value.price,
        stock: this.refreshmentForm.value.stock
      };

      this.refreshmentService.createRefreshment(newRefreshment).subscribe(res=>{
        this.response = res;
        Swal.fire("Success",this.response,"success");
        this.getAllRefreshment();
        this.generateUniqueRefreshmentId(); 
        this.refreshmentForm.reset();
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

  refreshmentList:Refreshment[];
  existingName:string[] = [];

  getAllRefreshment(){
    this.refreshmentService.getAllRefreshment().subscribe((refreshmentLst) => {
      this.refreshmentList = refreshmentLst;
      this.existingName = this.refreshmentList.map(refreshment => refreshment.name);
      console.log(this.existingName);
    })
  }
}

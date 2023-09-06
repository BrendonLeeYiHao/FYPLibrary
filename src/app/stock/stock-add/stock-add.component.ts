// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Equipment } from 'src/app/model/equipmentModel';
import { InventoryService } from 'src/app/service/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.css']
})
export class StockAddComponent implements OnInit{

  inventoryForm!:UntypedFormGroup;

  constructor(private inventoryService:InventoryService, private fb:UntypedFormBuilder){
    this.inventoryForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern("^(?! )(?!.* {2}.*)[a-zA-Z0-9\\s]{2,49}[a-zA-Z0-9]$"), (control: AbstractControl<any, any>) => this.uniqueName(control, this.existingName)]],
      description: [null, [Validators.required, Validators.pattern("^(?!\\s).*$"), Validators.maxLength(200)]],
      price: [null, [Validators.required, Validators.pattern('^[0-9]{1,2}(\.[0-9]{2})?$')]],
      stock: [null, [Validators.required, Validators.max(10000), Validators.pattern('^[0-9]+$')]],
      uploadImage: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.generateUniqueEquipmentId();
    this.getExistingName();
    this.getImagesFromAssets();
  }

  image:File;
  response:any;
  fileSizeError:boolean;

  selectedImage:any;

  fileDuplicateNameError:boolean;

  getImagesFromAssets(){
    this.inventoryService.getImagesFromAssets().subscribe(res=>{
      this.existingImage = res;
      console.log(this.existingImage);
    })
  }

  onChange(event:any){
    this.fileDuplicateNameError = false;
    this.fileSizeError = false;
    if(event.target.files[0] != undefined){
      this.image = event.target.files[0];
      const maxSize = 2000000;
      if(this.existingImage.includes(this.image.name)){   //Check for filename duplication
        this.fileDuplicateNameError = true;
        this.inventoryForm.controls['uploadImage'].reset();
        this.selectedImage = null;
      }
      else if(this.image.size > maxSize){   //Check file size
        this.fileSizeError = true;
        this.inventoryForm.controls['uploadImage'].reset();
        this.selectedImage = null;
      }  
      else{
        if(this.image){
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.selectedImage = e.target.result;
          };
          reader.readAsDataURL(this.image);
        }
      }
    }else{
      this.selectedImage = null;
    }
  }

  upload(){
    if(this.inventoryForm.valid){
      const newEquipment:Equipment = {
        id: this.uniqueEquipmentId,
        name: this.inventoryForm.value.name,
        description: this.inventoryForm.value.description,
        price: this.inventoryForm.value.price,
        stock: this.inventoryForm.value.stock,
        image: this.image.name
      }
      console.log(newEquipment);
      const formData = new FormData();
      formData.append('file', this.image);
      formData.append('newEquipment', JSON.stringify(newEquipment));
      this.inventoryService.createEquipment(formData).subscribe(res=>{
        this.response = res;
        Swal.fire("Success",this.response,"success");
        this.generateUniqueEquipmentId();
        this.getExistingName();   //to refresh list of existing equipment names
        this.getImagesFromAssets();   //to refresh list of existing images from assets
        this.inventoryForm.reset();
        this.selectedImage = null;
      })
    }
    else{
      this.fileDuplicateNameError = false;
      this.fileSizeError = false;
      Object.values(this.inventoryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }

  }

  uniqueId:any;
  uniqueEquipmentId:any;

  generateUniqueEquipmentId(){
    this.inventoryService.getEquipmentId().subscribe(res => {
      this.uniqueId = res;
      if(this.uniqueId.EquipmentID == null){
        this.uniqueEquipmentId = "E001";
      }
      else{
        const numericPart = this.uniqueId.EquipmentID.toString().substr(1);
        const incrementedNumber = parseInt(numericPart, 10) + 1;
        const formattedNumber = incrementedNumber.toString().padStart(numericPart.length, "0");
        this.uniqueEquipmentId = "E" + formattedNumber;
        console.log(this.uniqueEquipmentId);
      }
    })
  }

  allInventoryList:Equipment[];
  existingName:string[] = [];
  existingImage:string[] = [];

  uniqueName(control: AbstractControl, existingName:string[]): {[key:string]:any} | null{
    const name = control.value;  
    if(existingName.includes(name)){
      return { uniqueName: true};
    }
    return null;
  }

  getExistingName(){
    this.inventoryService.getAllEquipment().subscribe(res=>{
      this.allInventoryList = res;
      this.existingName = this.allInventoryList.map(equipment => equipment.name);
    })
  }


}

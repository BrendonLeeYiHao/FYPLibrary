// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipment } from 'src/app/model/equipmentModel';
import { InventoryService } from 'src/app/service/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-delete-update',
  templateUrl: './stock-delete-update.component.html',
  styleUrls: ['./stock-delete-update.component.css']
})
export class StockDeleteUpdateComponent implements OnInit{

  constructor(private inventoryService:InventoryService, private fb:FormBuilder){}

  allInventoryList:Equipment[];

  ngOnInit(): void {
      this.getAll();
      this.getImagesFromAssets();
      this.initializeForm();
  }

  isVisible = false;
  response:any;

  inventoryForm:FormGroup;

  initializeForm(){
    this.inventoryForm = this.fb.group({
      id: [null],
      name: [null],
      description: [null, [Validators.required, Validators.pattern("^(?!\\s).*$"), Validators.maxLength(200)]],
      price: [null, [Validators.required, Validators.pattern('^[0-9]{1,2}(\.[0-9]{2})?$')]],
      stock: [null, [Validators.required, Validators.max(10000), Validators.pattern('^[0-9]+$')]],
      uploadImage: [null],
      newImage: [null]
    })
  }

  existingImage:string[] = [];

  getAll(){
    this.inventoryService.getAllEquipment().subscribe(res=>{
      this.allInventoryList = res;
      console.log(this.allInventoryList);
    })
  }

  filenames:any = [];

  getImagesFromAssets(){
    this.inventoryService.getImagesFromAssets().subscribe(res=>{
      this.existingImage = res;
      console.log(this.existingImage);
    })
  }

  openUpdateModal(equipment:Equipment){
    this.isVisible = true;
    this.inventoryForm.controls['id'].setValue(equipment.id);
    this.inventoryForm.controls['name'].setValue(equipment.name);
    this.inventoryForm.controls['description'].setValue(equipment.description);
    this.inventoryForm.controls['price'].setValue(equipment.price);
    this.inventoryForm.controls['stock'].setValue(equipment.stock);
    this.inventoryForm.controls['uploadImage'].setValue(equipment.image);
  }


  handleCancel(){
    this.isVisible = false;
    this.initializeForm();
  }

  handleOk(){
    if(this.inventoryForm.valid){
      const updatedEquipment: Equipment = {
        id: this.inventoryForm.value.id,
        name: this.inventoryForm.value.name,
        description: this.inventoryForm.value.description,
        price: this.inventoryForm.value.price,
        stock: this.inventoryForm.value.stock,
        image: this.inventoryForm.value.uploadImage
      };

      const formData = new FormData();
      if(this.selectedImage == null || undefined){
        formData.append('updatedEquipment', JSON.stringify(updatedEquipment));
      }
      else{
        formData.append('file', this.image);
        formData.append('updatedEquipment', JSON.stringify(updatedEquipment));
      }

      this.inventoryService.updateEquipment(formData).subscribe(res=>{
        this.response = res;
        console.log(this.response);
        Swal.fire("Success", this.response, "success");
        this.selectedImage = null;
        this.getAll();
        this.getImagesFromAssets();
        this.initializeForm();
        this.isVisible = false;
      })
    }
    else{
      Object.values(this.inventoryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
  }

  openDeleteModal(equipmentId:string, originalImage:string){
    Swal.fire({
      title: 'Do you wish to delete equipment of ID ' + equipmentId,
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
        this.inventoryService.deleteEquipment(equipmentId, originalImage).subscribe(res=>{
          this.response = res;
          Swal.fire('Success',this.response,"success");
          this.getAll();
          this.getImagesFromAssets();
          this.initializeForm();
        })
      }
    })
  }


  fileDuplicateNameError:boolean;
  fileSizeError:boolean;
  image:File;
  selectedImage:any;

  onChange(event:any){
    this.fileDuplicateNameError = false;
    this.fileSizeError = false;
    if(event.target.files[0] != undefined){
      this.image = event.target.files[0];
      const maxSize = 2000000;
      if(this.existingImage.includes(this.image.name)){   //check image filename duplication
        this.fileDuplicateNameError = true;
        this.inventoryForm.controls['newImage'].reset();
        this.selectedImage = null;
      }
      else if(this.image.size > maxSize){   //check image size
        this.fileSizeError = true;
        this.inventoryForm.controls['newImage'].reset();
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
}

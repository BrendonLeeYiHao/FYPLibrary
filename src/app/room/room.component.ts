// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { RoomService } from '../service/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../service/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{

  constructor(private roomService:RoomService, private fb:FormBuilder, private inventoryService:InventoryService){}

  allRoomList:any[];
  isVisible:boolean = false;
  roomForm:FormGroup;
  response:any;

  ngOnInit(): void {
    this.getAllRooms();
    this.getImagesFromAssets();
    this.initializeForm();
  }

  getAllRooms(){
    this.roomService.getAllRooms().subscribe(res=>{
      this.allRoomList = res;
      console.log(this.allRoomList);
    })
  }

  openUpdateModal(room:any){
    this.isVisible = true;
    this.roomForm.controls['id'].setValue(room.RoomID);
    this.roomForm.controls['roomNo'].setValue(room.RoomNo);
    this.roomForm.controls['description'].setValue(room.RoomDescription);
    this.roomForm.controls['uploadImage'].setValue(room.RoomImage);
  }

  handleCancel(){
    this.isVisible = false;
    this.initializeForm();
  }

  handleOk(){
    if(this.roomForm.valid){
      const updatedRoom = {
        id: this.roomForm.value.id,
        roomNo: this.roomForm.value.roomNo,
        description: this.roomForm.value.description,
        image: this.roomForm.value.uploadImage
      }

      console.log(updatedRoom);

      const formData = new FormData();
      //without replacing existing image
      if(this.selectedImage == null || undefined){
        formData.append('updatedRoom', JSON.stringify(updatedRoom));
      }
      else{
        //replace existing image
        formData.append('file', this.image);
        formData.append('updatedRoom', JSON.stringify(updatedRoom));
      }

      this.roomService.updateRoom(formData).subscribe(res=>{
        this.response = res;
        Swal.fire("Success", this.response, "success");
        this.selectedImage = null;
        this.getAllRooms();
        this.getImagesFromAssets();
        this.initializeForm();
        this.isVisible = false;
      })
    }else{
      Object.values(this.roomForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
  }

  initializeForm(){
    this.roomForm = this.fb.group({
      id: [null],
      roomNo: [null],
      description:  [null, [Validators.required, Validators.pattern("^(?!\\s).*$"), Validators.maxLength(200)]],
      uploadImage: [null],
      newImage: [null]
    })
  }

  existingImage:string[] = [];

  getImagesFromAssets(){
    this.inventoryService.getImagesFromAssets().subscribe(res=>{
      this.existingImage = res;
      console.log(this.existingImage);
    })
  }

  fileDuplicateNameError:boolean;
  fileSizeError:boolean;
  image:File;
  selectedImage:any;

  //upon choosing a picture to upload, check for file validations
  onChange(event:any){
    this.fileDuplicateNameError = false;
    this.fileSizeError = false;
    if(event.target.files[0] != undefined){
      this.image = event.target.files[0];
      const maxSize = 2000000;
      if(this.existingImage.includes(this.image.name)){   //Name duplication error
        this.fileDuplicateNameError = true;
        this.roomForm.controls['newImage'].reset();
        this.selectedImage = null;
      }
      else if(this.image.size > maxSize){   //maximum image size
        this.fileSizeError = true;
        this.roomForm.controls['newImage'].reset();
        this.selectedImage = null;
      }  
      else{
        if(this.image){
          //display image if valid
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

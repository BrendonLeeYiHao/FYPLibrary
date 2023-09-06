// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BookService } from '../service/book.service';
import { DatePipe, Time } from '@angular/common';
import { InventoryService } from '../service/inventory.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoomModalComponent } from '../room-modal/room-modal.component';
import { RoomService } from '../service/room.service';
import { RandomService } from '../shared-service/random.service';
import { RefreshmentService } from '../service/refreshment.service';
import { UserService } from '../service/user.service';
import { User } from '../model/userModel';
import { Booking } from '../model/bookingModel';
import emailjs from '@emailjs/browser';

declare var $:any;

@Component({
  selector: 'app-librarian-book',
  templateUrl: './librarian-book.component.html',
  styleUrls: ['./librarian-book.component.css']
})
export class LibrarianBookComponent implements AfterViewInit, OnInit{

  retrievedUsername:any = null;

  uniqueId:any;
  uniqueBookingId:string;

  ngOnInit(): void {
    this.generateUniqueBookingId();
    this.getAllUsers();
    this.getAllInventory();
    this.getRefreshments();
    this.getAllOngoingBookings();
    this.bookService.getAllDate().subscribe(res=>{
      this.everyTimeList = res;
      console.log(this.everyTimeList);
    })
    this.showDefaultDisabledDate();
    this.updateStepsDirection();
  }

  filteredOngoingBookingLst:Booking[];

  //retrieved all Ongoing status bookings
  getAllOngoingBookings(){
    this.bookService.getAllOngoingBookings("Ongoing").subscribe(res=>{
      this.filteredOngoingBookingLst = res;
      console.log(this.filteredOngoingBookingLst);
      this.filterUsernames();
    })
  }

  ngAfterViewInit(): void {
    console.log('Mapster Version:', $.mapster.version);
    this.onImageLoad();
  }

  //generate unique bookingID
  generateUniqueBookingId(){
    this.bookService.getBookingId().subscribe(res => {
      this.uniqueId = res;
      console.log(this.uniqueId.BookingID);
      
      if(this.uniqueId.BookingID == null){
        this.uniqueBookingId = "B001";
      }
      else{
        const numericPart = this.uniqueId.BookingID.toString().substr(1);
        const incrementedNumber = parseInt(numericPart, 10) + 1;
        const formattedNumber = incrementedNumber.toString().padStart(numericPart.length , "0");
        this.uniqueBookingId = "B" + formattedNumber;
        console.log(this.uniqueBookingId);
      }
    })
  }

  allUserList:User[] = [];

  allFilteredUserList:string[] = [];

  username:any;

  filterUsernames(){
    //transform current time to format HH:mm
    const now = new Date();
    var nowStringDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    var actualMinutes = now.getMinutes();
    var currentStringTime = now.getHours() + ":" + actualMinutes;
    if((currentStringTime.length == 4) && (currentStringTime.indexOf(":") == 1)){
      currentStringTime = currentStringTime.padStart(5, '0');
    }
    else if(((currentStringTime.length == 4) && (currentStringTime.indexOf(":") == 2)) || (currentStringTime.length == 3)){
      const [hours, minutes] = currentStringTime.split(':').map(value => value.padStart(2, '0'));
      currentStringTime = hours + ":" + minutes;
    }
    console.log(currentStringTime);

    this.allFilteredUserList = [];
    for(let user of this.allUserList){
      this.flag = true;
      for(let booking of this.filteredOngoingBookingLst){
        if(user.username == booking.username){
          this.flag = false;
          if((nowStringDate! > booking.bookingDate) || ((booking.bookingDate == nowStringDate) && (currentStringTime >= booking.endTime))){
            this.bookService.updateBookingStatus(booking.id).subscribe(res=>{   //update Booking Status to completed in case not yet
              this.response = res;
              this.allFilteredUserList.push(user.username);   //obtain all valid usernames
            });
          }
          break;
        }
      }
      if(this.flag){
        this.allFilteredUserList.push(user.username);
      }
    }
    console.log(this.allFilteredUserList);
  }


  getAllUsers(){
    this.userService.getAllUsers().subscribe(res=>{
      this.allUserList = res;
      console.log(this.allUserList);
      console.log(this.allUserList.length);
    })
  }

  getAllInventory(){
    this.inventoryService.getAllInventory().subscribe(res=>{
      this.allInventoryList = res;
      //Add quantity property to each item in the AllInventoryList
      this.allInventoryList.forEach((item: { quantity: number; }) => {
        item.quantity = 0;
      })
      console.log(this.allInventoryList);
    })
  }

  allRefreshmentList:any;

  getRefreshments(){
    this.refreshmentService.getRefreshments().subscribe(res=>{
      this.allRefreshmentList = res;
      //Add quantity property to each item in the AllRefreshmentList
      this.allRefreshmentList.forEach((item: {quantity: number;}) => {
        item.quantity = 0;
      })
      console.log(this.allRefreshmentList);
    })
  }

  bookingFees:number;
  bookingFeesList:any[] = [];

  calculateBookingFee(){
    this.bookingFeesList = [];
    const endTime = new Date(`2000-01-01 ${this.firstStepForm.value.endTime}`);
    const startTime = new Date(`2000-01-01 ${this.firstStepForm.value.startTime}`);
    console.log(endTime);
    console.log(startTime);
    const timeDifference = endTime.getTime() - startTime.getTime();
    const minutesDifference = Math.floor(timeDifference / 60000);
    this.bookingFees = (minutesDifference / 30) * 2;

    const bookingFeesDetails = {
      name: 'Booking',
      feesPerHour: 2,
      noOfMinutes: minutesDifference,
      totalPrice: this.bookingFees
    }

    this.bookingFeesList.push(bookingFeesDetails);
  }

  //2D Floor plan
  onImageLoad(){
    const self = this;
    $('#floorMap').mapster({
      fillColor: '2bd42b',
      fillOpacity: 0.4,
      strokeWidth: 2,
      stroke: true,
      strokeColor: '2bd42b',
      singleSelect: true,
      render_select:{
        fillColor: 'b0f5b0',
        fillOpacity: 0.5
      },
      onClick: function(){
        const area = $(this);
        console.log(area);
        const title = area.attr('title');
        console.log(title);
        self.showModal(area,title);
      }
    })
  }

  private modalRef:NzModalRef;


  //After selecting a room, a modal box showing the respective room details is shown referring to the RoomModalComponent.
  //If select ok, then the area is deselected, username, roomName and roomType are auto assigned to the input fields.
  showModal(area:any, title:string): void {
    this.modalRef = this.modalService.create({
      nzTitle: 'Room Description',
      nzWidth:600,
      nzContent: RoomModalComponent,
      nzMaskClosable: false,
      nzComponentParams:{
        title:title
      },
      nzOnOk: () => {
        area.mapster('deselect');
        this.firstStepForm.reset();
        this.selectedDate = null;
        this.selectedStartTime = "";
        this.resetQuantities();
        this.firstStepForm.controls['roomName'].setValue(title);

        if(title == "Room 1" || title == "Room 2" || title == "Room 3" || title == "Room 4" || title == "Room 5" || title == "Room 6"){
          this.firstStepForm.controls['roomType'].setValue("4-pax room");
          this.noOfUserOption = ['1','2','3','4'];
        }
        else{
          this.firstStepForm.controls['roomType'].setValue("8-pax room");
          this.noOfUserOption = ['5','6','7','8'];
        }
        this.current += 1;
        console.log(this.current);
      },
      nzOnCancel: () => {
        area.mapster('deselect');
      }
    })
  }

  resetQuantities(){
    this.allInventoryList.forEach((item: { quantity: number; }) => {
      item.quantity = 0;
    })
    this.allRefreshmentList.forEach((item: { quantity: number; }) => {
      item.quantity = 0;
    })
  }

  checked:boolean = false;
  logCheckBox(){
    console.log(this.checked);
  }

  refreshmentOpt:string[];
  allInventoryList:any;
  refreshmentLst:string[] = [];
  selectedEquipment: {name:string, quantity: number, price: number}[] = [];

  totalPriceEquipment:number;
  totalPriceRefreshment:number;

  calculateTotalPayment(){
    this.totalPriceEquipment = 0;
    this.totalPriceRefreshment = 0;

    //Public user required to pay for the equipment loaned
    if(this.retrievedUserType.UserType == "Public User" && this.selectedEquipments.length > 0){
      this.totalPriceEquipment = this.selectedEquipments.reduce((total, item) => {
        return total + (item.quantity * Number(item.EquipmentPrice));
      }, 0)
    }

    if(this.selectedRefreshments.length > 0){
      this.totalPriceRefreshment = this.selectedRefreshments.reduce((total, item) => {
        return total + (item.quantity * Number(item.RefreshmentPrice));
      }, 0)
    }

    console.log("Total Price for Equipment: " + this.totalPriceEquipment);
    console.log("Total Price for Refreshment: " + this.totalPriceRefreshment);
  }

  selectedEquipments: any[] = [];
  selectedRefreshments:any[] = [];

  logData(){

    this.selectedEquipments = this.allInventoryList.filter((item: { quantity: string | number; }) => {
      return item.quantity !== 0 && item.quantity !== '';
    })
    
    this.selectedRefreshments = this.allRefreshmentList.filter((item: { quantity: string | number; }) => {
      return item.quantity !== 0 && item.quantity !== '';
    })
    console.log(this.selectedEquipments);
    console.log(this.selectedRefreshments);
  }

  content:any;
  tempRoom:any;
  noOfUserOption: string[] = [];

  startTimeList = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];
  endTimeList = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'];


  firstStepForm !: UntypedFormGroup;
  checkBoxForm !: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private bookService:BookService, private datePipe: DatePipe, private inventoryService:InventoryService, private modalService: NzModalService, private roomService:RoomService, private randService:RandomService, private refreshmentService:RefreshmentService, private userService:UserService){
    this.firstStepForm = this.fb.group({
      roomName: [null, Validators.required],
      roomType: [null, Validators.required],
      noOfUsers: [null, Validators.required],
      username: [null, Validators.required],
      bookingdate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    })

    this.checkBoxForm = this.fb.group({
      selectedOptions: [[]]
    })

  }

  selectedDate:Date | null;
  selectedStartTime:string;
  selectedStringDate: any;
  allTimeList:any;
  dateFormat = 'yyyy-MM-dd';
  index:number;
  startList:string[] = [];
  endList:string[] = [];
  flag:boolean;
  startIndex:number;
  dbIndex:number;
  currentStringDate:any;
  everyTimeList:any;

  retrievedUserType:any;
  
  disabledDate:any;

  //validation of disabling booking date
  changeDisabledDate(event:any){
    if(event != null){
      console.log(event);
      this.firstStepForm.controls['bookingdate'].setValue(null);
      this.userService.checkUserType(event).subscribe(res=>{
        this.retrievedUserType = res;
        console.log(this.retrievedUserType.UserType);

        //In the case for public user
        if(this.retrievedUserType.UserType == "Public User"){
          this.disabledDate = (current: Date): boolean => {
            const today = new Date();
            const maxDate = new Date();
            maxDate.setDate(today.getDate() + 29);

            //Convert current time into string format
            var actualMinutes = today.getMinutes();
            var currentStringTime = today.getHours() + ":" + actualMinutes;
            if((currentStringTime.length == 4) && (currentStringTime.indexOf(":") == 1)){
              currentStringTime = currentStringTime.padStart(5, '0');
            }
            else if(((currentStringTime.length == 4) && (currentStringTime.indexOf(":") == 2)) || (currentStringTime.length == 3)){
              const [hours, minutes] = currentStringTime.split(':').map(value => value.padStart(2, '0'));
              currentStringTime = hours + ":" + minutes;
            }
            console.log(currentStringTime);

            //Date is disabled for date which is before today and after 30 days.
            if((current < today || current > maxDate) && current.toDateString() !== today.toDateString()){
              return true;
            }
  
            //Date is disabled for date which is today where time exceeds 17:30
            if(current.toDateString() === today.toDateString() && ((today.getHours() == 17 && today.getMinutes() > 30) || (today.getHours() >= 18))){
              return true;
            }

            //Date is disabled for all weekdays
            const day = current.getDay();
            if(!(day === 6 || day === 0)){
              return true;
            }
  
            //Date is disabled for all time slots being booked for that particular date
            if((current >= today) || current.toDateString() === today.toDateString()){
              this.currentStringDate = this.datePipe.transform(current, 'yyyy-MM-dd');
              for(let startTimeItem of this.startTimeList){
                this.flag = true;
                for(this.index = 0; this.index < this.everyTimeList.length; this.index++){
                  if((this.currentStringDate == this.everyTimeList[this.index].BookingDate) && (this.everyTimeList[this.index].RoomName == this.firstStepForm.value.roomName)){      
                    if(((startTimeItem == this.everyTimeList[this.index].StartTime)) || 
                    ((startTimeItem >= this.everyTimeList[this.index].StartTime) && (startTimeItem < this.everyTimeList[this.index].EndTime))){
                      this.flag = false;
                      break;
                    }
                  }
                }
                if(this.flag){
                  if(current.toDateString() != today.toDateString()){
                    return false;
                  }
                  else if(current.toDateString() == today.toDateString() && currentStringTime <= startTimeItem){
                    return false;
                  }
                }
              } 
              return true;
            }
            return false;
          }
        }
        else{
          this.showDefaultDisabledDate();
        }
      })

      }
    }

    //validation for disabling booking date
    showDefaultDisabledDate(){
      
        this.disabledDate = (current: Date): boolean => {
          const today = new Date();
          const maxDate = new Date();
          maxDate.setDate(today.getDate() + 29);

          var actualMinutes = today.getMinutes();
          var currentStringTime = today.getHours() + ":" + actualMinutes;
          if((currentStringTime.length == 4) && (currentStringTime.indexOf(":") == 1)){
            currentStringTime = currentStringTime.padStart(5, '0');
          }
          else if(((currentStringTime.length == 4) && (currentStringTime.indexOf(":") == 2)) || (currentStringTime.length == 3)){
            const [hours, minutes] = currentStringTime.split(':').map(value => value.padStart(2, '0'));
            currentStringTime = hours + ":" + minutes;
          }
          console.log(currentStringTime);

          //Date is disabled for date which is before today and after 30 days.
          if((current < today || current > maxDate) && current.toDateString() !== today.toDateString()){
            return true;
          }

          //Date is disabled for date which is today where time exceeds 17:30
          if(current.toDateString() === today.toDateString() && ((today.getHours() == 17 && today.getMinutes() > 30) || (today.getHours() >= 18))){
            return true;
          }

          //Date is disabled for all time slots being booked for that particular date
          if((current >= today) || current.toDateString() === today.toDateString()){
            this.currentStringDate = this.datePipe.transform(current, 'yyyy-MM-dd');
            for(let startTimeItem of this.startTimeList){
              this.flag = true;
              for(this.index = 0; this.index < this.everyTimeList.length; this.index++){
                if((this.currentStringDate == this.everyTimeList[this.index].BookingDate) && (this.everyTimeList[this.index].RoomName == this.firstStepForm.value.roomName)){      
                  if(((startTimeItem == this.everyTimeList[this.index].StartTime)) || 
                  ((startTimeItem >= this.everyTimeList[this.index].StartTime) && (startTimeItem < this.everyTimeList[this.index].EndTime))){
                    this.flag = false;
                    break;
                  }
                }
              }
              if(this.flag){
                if(current.toDateString() != today.toDateString()){
                  return false;
                }
                else if(current.toDateString() == today.toDateString() && currentStringTime <= startTimeItem){
                  return false;
                }
              }
            } 
            return true;
          }
          return false;
        }
    }
      
  //Selection on booking date triggers the filtering of start time
  onDateSelect(date:Date){
    this.firstStepForm.controls['startTime'].reset();
    this.firstStepForm.controls['endTime'].reset();
    this.selectedDate = date;

    this.selectedStringDate = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    this.selectedStartTime = '';

    this.startList = [];
    this.endList = [];

    const now = new Date();
    var nowStringDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    var actualMinutes = now.getMinutes();
    var currentStringTime = now.getHours() + ":" + actualMinutes;
    if((currentStringTime.length == 4) && (currentStringTime.indexOf(":") == 1)){
      currentStringTime = currentStringTime.padStart(5, '0');
    }
    else if(((currentStringTime.length == 4) && (currentStringTime.indexOf(":") == 2)) || (currentStringTime.length == 3)){
      const [hours, minutes] = currentStringTime.split(':').map(value => value.padStart(2, '0'));
      currentStringTime = hours + ":" + minutes;
    }
    console.log(currentStringTime);

    this.bookService.getStartEndDate(this.selectedStringDate, this.firstStepForm.value.roomName).subscribe(res=>{
      this.allTimeList = res;
      console.log(this.allTimeList);
      for(let startTimeItem of this.startTimeList){
          this.flag = true;
          for(this.index = 0; this.index < this.allTimeList.length; this.index++){
            if(((startTimeItem == this.allTimeList[this.index].StartTime)) || 
            ((startTimeItem >= this.allTimeList[this.index].StartTime) && (startTimeItem < this.allTimeList[this.index].EndTime)) ||
            ((nowStringDate == this.selectedStringDate) && (currentStringTime > startTimeItem))){
              this.flag = false;
              break;
            }
          }
          if(this.flag){
            if(!((nowStringDate == this.selectedStringDate) && (currentStringTime > startTimeItem))){
              this.startList.push(startTimeItem);
            }
          }
      }
    })
  }

  //Selection of start time triggers the filtering of end time
  setStartTimeControlName(startTime:string){
    this.firstStepForm.controls['startTime'].setValue(startTime);
    this.selectedStartTime = startTime;
    this.firstStepForm.controls['endTime'].reset();
    this.endList = [];
    console.log(this.endTimeList.indexOf(startTime));
    this.startIndex = this.endTimeList.indexOf(startTime) + 6;

    for(this.index = this.endTimeList.indexOf(startTime) + 1; ((this.index <= this.startIndex) && (this.index < this.endTimeList.length)); this.index++){
      console.log(this.endTimeList[this.index]);
      this.flag = true;
      for(this.dbIndex = 0; this.dbIndex < this.allTimeList.length; this.dbIndex++){
        console.log(this.allTimeList[this.dbIndex]);

        if(((this.endTimeList[this.index] == this.allTimeList[this.dbIndex].EndTime)) || 
        ((this.endTimeList[this.index] > this.allTimeList[this.dbIndex].StartTime) && (this.endTimeList[this.index] <= this.allTimeList[this.dbIndex].EndTime)) ||
        ((startTime < this.allTimeList[this.dbIndex].StartTime) && (this.endTimeList[this.index] >= this.allTimeList[this.dbIndex].EndTime))){
          this.flag = false;
          break;
        }
      }
      if(this.flag){
        this.endList.push(this.endTimeList[this.index]);
      }
    }
  }

  setEndTimeControlName(endTime:String){
    this.firstStepForm.controls['endTime'].setValue(endTime);
  }

  register(){
    if(this.firstStepForm.valid){
      console.log(this.firstStepForm.value);
      console.log(this.tempRoom);
      Swal.fire("success","Correct","success");
    }else{
      Swal.fire("error","Not all inputs are valid","error");
    }
  }

  sendEmail(newBooking:Booking){
    var params = {
      reminder: "",
      recipientEmail: "iihaobrendon2001@gmail.com",
      username: newBooking.username,
      roomName: newBooking.roomName,
      bookingDate: newBooking.bookingDate,
      startTime: newBooking.startTime,
      endTime: newBooking.endTime,
    };

    emailjs.send('service_eycok9f', 'template_3qfwil5', params, 'yZebMpS7xHEwXJBlO').then((response)=>{
      console.log('SUCCESS!', response.status, response.text);
    }, (err)=>{
      console.log('FAILED...', err);
    });
   
  }

  current = 0;

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    if(this.firstStepForm.valid){
      if(this.current == 2){
        this.current += 1;
        this.logData();
        if(this.retrievedUserType.UserType == "Public User"){
          this.calculateBookingFee();
        }else{
          this.bookingFees = 0;
        }
        this.calculateTotalPayment();
        
      }else{
        this.current += 1;
      }    
    }
    else{
      Object.values(this.firstStepForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          Swal.fire("Error","Please fill up the fields correctly!","error");
        }
      }); 
    }
  }


  done(): void {
    if(this.checked){
      const newBooking: Booking = {
        id: this.uniqueBookingId,
        username: this.firstStepForm.value.username,
        roomName: this.firstStepForm.value.roomName,
        roomType: this.firstStepForm.value.roomType,
        noOfUsers: this.firstStepForm.value.noOfUsers,
        bookingDate: this.selectedStringDate,
        startTime: this.firstStepForm.value.startTime,
        endTime: this.firstStepForm.value.endTime,
        totalPayment: this.totalPriceEquipment + this.totalPriceRefreshment + this.bookingFees,
        bookingStatus: "Ongoing",
        feedback: "No"
      }
      console.log(newBooking);
      this.bookService.createNewBooking(newBooking, this.selectedEquipments, this.selectedRefreshments).subscribe(res=>{
        this.response = res;
        console.log(this.response);
        this.sendEmail(newBooking);
        Swal.fire("Success", "Booking Successfully Made!", "success");
        this.current = 0;
        this.firstStepForm.reset();
        this.generateUniqueBookingId();
        this.getAllOngoingBookings();
        this.showDefaultDisabledDate();
        this.resetQuantities();
      })
    }else{
      Swal.fire("Error", "You need to agree with our rules & regulations in order to proceed!", "error");
    }
  }

  response:any;  

  stepsDirection: 'horizontal' | 'vertical' = 'horizontal';

  @HostListener('window:resize', ['$event'])
  onWindowResize(){
    this.updateStepsDirection();
  }

  updateStepsDirection(){
    const screenWidth = window.innerWidth;
    if(screenWidth < 700){
      this.stepsDirection = 'vertical';
    }else{
      this.stepsDirection = 'horizontal';
    }
  }
}

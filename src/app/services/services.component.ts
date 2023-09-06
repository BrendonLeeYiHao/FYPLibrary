// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../service/inventory.service';
import { Equipment } from '../model/equipmentModel';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{

  constructor(private inventoryService:InventoryService){}

  allEquipmentList:Equipment[];
  itemCount:number;
  slicedItems:any[];
  isVisible:boolean = false;

    ngOnInit(): void {
        this.inventoryService.getAllEquipment().subscribe(res=>{
          this.allEquipmentList = res;
          this.itemCount = this.allEquipmentList.length;
          if(this.itemCount > 3){
            this.isVisible = true;
          }
          this.slicedItems = this.allEquipmentList.slice(0, 3);   //only show three items
        })
    }

    showMore(){
      this.slicedItems = this.allEquipmentList;
      this.isVisible = false;
    }
}

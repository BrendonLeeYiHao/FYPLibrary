// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Equipment } from '../model/equipmentModel';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private SERVER_URL = "http://localhost:80";

  constructor(private httpClient:HttpClient) { }

  public upload(formData:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/equipment/uploadInventory.php", formData);
  }

  public createPublicUser(registerForm:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/equipment/createStudent.php", {publicUserInfo: registerForm});
  }

  public getAllInventory():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/equipment/getAllEquipment.php");
  }

  public getEquipmentId():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/equipment/getUniqueEquipmentId.php");
  }

  public createEquipment(formData:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/equipment/createEquipment.php", formData);
  }

  public getAllEquipment():Observable<Equipment[]>{
    return this.httpClient.get<Equipment[]>(this.SERVER_URL + "/angular/equipment/getAllEquipment.php").pipe(
      map((equipmentLst: any[]) => {
        return equipmentLst.map(equipment => {
          return new Equipment(equipment.EquipmentID, equipment.EquipmentName, equipment.EquipmentDescription, equipment.EquipmentPrice, equipment.EquipmentStock, equipment.EquipmentImage);
        })
      })
    )
  }

  public deleteEquipment(equipmentId:string, originalImage:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/equipment/deleteEquipment.php", {equipmentId: equipmentId, originalImage: originalImage});
  }

  public getImagesFromAssets():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/equipment/getImagesFromAssets.php");
  }

  public updateEquipment(formData:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/equipment/updateEquipment.php", formData);
  }
}

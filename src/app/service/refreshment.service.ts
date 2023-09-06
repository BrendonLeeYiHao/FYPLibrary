// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Refreshment } from '../model/refreshmentModel';

@Injectable({
  providedIn: 'root'
})
export class RefreshmentService {

  private SERVER_URL = "http://localhost:80";

  constructor(private httpClient:HttpClient) { }

  public getRefreshmentId():Observable<string>{
    return this.httpClient.get<string>(this.SERVER_URL + "/angular/refreshment/getUniqueRefreshmentId.php");
  }

  public checkUniqueRefreshmentId(uniqueId:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/refreshment/checkUniqueRefreshmentId.php", {id:uniqueId});
  }

  public createRefreshment(newRefreshment: Refreshment):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/refreshment/createRefreshment.php", {newRefreshment: newRefreshment});
  }

  public getAllRefreshment():Observable<Refreshment[]>{
    return this.httpClient.get<Refreshment[]>(this.SERVER_URL + "/angular/refreshment/getAllRefreshment.php").pipe(
      map((refreshmentLst: any[]) => {
        return refreshmentLst.map(refreshment => {
          return new Refreshment(refreshment.RefreshmentID, refreshment.RefreshmentName, refreshment.RefreshmentPrice, refreshment.RefreshmentStock);
        });
      })
    );
  }

  public getRefreshments():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/refreshment/getAllRefreshment.php");
  }


  public updateRefreshment(updatedRefreshment:Refreshment):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/refreshment/updateRefreshment.php", {updatedRefreshment: updatedRefreshment});
  }

  public deleteRefreshment(refreshmentId:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/refreshment/deleteRefreshment.php",{refreshmentId:refreshmentId});
  }
  


}

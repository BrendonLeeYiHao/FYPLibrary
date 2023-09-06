// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentUsageService {

  private SERVER_URL = "http://localhost:80";

  constructor(private httpClient:HttpClient) { }

  public getGraphByYear():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/statistic-equipment/getGraphByYear.php");
  }

  public getGraphByMonth(selectedMonth:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/statistic-equipment/getGraphByMonth.php", {selectedMonth: selectedMonth});
  }
}

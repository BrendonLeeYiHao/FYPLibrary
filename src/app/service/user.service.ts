// Developer Name: Brendon Lee Yi Hao
// Course Name: BSc (Hons) Software Engineering
// Last Modified: 5/7/2023

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SERVER_URL = "http://localhost:80";

  private userType: string = "guest";
  private isLoggedIn:boolean = false;
  private username:string;

  setUserType(userType:string){
    this.userType = userType;
  }

  getUserType(): string{
    return this.userType;
  }

  setUsername(username:string){
    this.username = username;
  }

  getUsername():string{
    return this.username;
  }

  // setIsLogin(isLogin:boolean){
  //   this.isLogin = isLogin;
  // }

  // getIsLogin(){
  //   return this.isLogin;
  // }

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  setLoginStatus(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
    this.isLoggedInSubject.next(this.isLoggedIn);
  }

  getLoginStatus():boolean{
    return this.isLoggedIn;
  }

  constructor(private httpClient:HttpClient) { }

  public createPublicUser(registerForm:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/createStudent.php", {publicUserInfo: registerForm});
  }

  public registerAllUsers(newUser: User):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/account/registerAllUsers.php", {newUser: newUser});
  }

  public getAllStatusPendingUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.SERVER_URL + "/angular/account/getAllStatusPendingUsers.php").pipe(
      map((userLst: any[]) => {
        return userLst.map(user => {
          return new User(user.ID, user.UserType, user.Name, user.Username, user.TpNoStaffId, user.Password, user.Email, user.PhoneNumber, user.Dob, user.Gender, user.Status);
        });
      })
    );
  }

  public getUsersByUserType(userType:String):Observable<User[]>{
    return this.httpClient.post<User[]>(this.SERVER_URL + "/angular/account/getUsersByUserType.php", {userType: userType}).pipe(
      map((userLst: any[]) => {
        return userLst.map(user => {
          return new User(user.ID, user.UserType, user.Name, user.Username, user.TpNoStaffId, user.Password, user.Email, user.PhoneNumber, user.Dob, user.Gender, user.Status);
        });
      })
    );
  }

  public approveAccount(id:number):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/account/approveAccount.php", {id: id});
  }

  public rejectAccount(id:number):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/account/rejectAccount.php", {id: id});
  }

  public getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.SERVER_URL + "/angular/account/getAllUsers.php").pipe(
      map((userLst: any[]) => {
        return userLst.map(user => {
          return new User(user.ID, user.UserType, user.Name, user.Username, user.TpNoStaffId, user.Password, user.Email, user.PhoneNumber, user.Dob, user.Gender, user.Status);
        });
      })
    );
  }

  public checkUserType(username:string):Observable<any>{
    return this.httpClient.post<any>(this.SERVER_URL + "/angular/account/checkUserType.php", {username: username});
  }

  public login(validateForm:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/account/login.php", {loginInfo: validateForm});
  }

  public deleteAccount(id:number):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/account/deleteAccount.php",{id:id});
  }

  public updateAccount(updatedAccount:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/account/updateAccount.php",{updatedAccount:updatedAccount});
  }
  
  public getPendingApprovalCount():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/account/getPendingApprovalCount.php");
  }

  public sendEmail():Observable<any>{
    return this.httpClient.get(this.SERVER_URL + "/angular/account/sendEmail.php");
  }

  public getUserByUsername(username:string):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/account/getUserByUsername.php", {username:username});
  }

  public updatePassword(updatedPassword:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/account/updatePassword.php", {updatedPassword: updatedPassword});
  }

  public resetPassword(newPassword:any):Observable<any>{
    return this.httpClient.post(this.SERVER_URL + "/angular/account/resetPassword.php", {newPassword: newPassword});
  }
}

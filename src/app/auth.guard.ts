import { CanActivate, Router} from "@angular/router";
import { UserService } from "./service/user.service";
import { Injectable } from "@angular/core";
import Swal from "sweetalert2";


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private userService:UserService, private router:Router){}

    canActivate():boolean{
        if(this.userService.getLoginStatus()){
            return true;
        }
        else{
            this.router.navigate(["/login"]);
            return false;
        }
    }
}
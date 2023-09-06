export class User{
    id: number;
    userType: string;
    name: string;
    username: string;
    tpNoStaffId: string | null;
    password: string;
    email: string;
    phoneNumber: string;
    dob: string | null;
    gender: string;
    status: string;

    constructor(id:number, userType:string, name:string, username:string, tpNoStaffId: string, password:string, email:string, phoneNumber:string, dob:string, gender:string, status:string){
        this.id = id;
        this.userType = userType;
        this.name = name;
        this.username = username;
        this.tpNoStaffId = tpNoStaffId;
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dob = dob;
        this.gender = gender;
        this.status = status;
    }
}
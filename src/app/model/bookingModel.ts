export class Booking{
    id: string;
    username: string;
    roomName: string;
    roomType: string;
    noOfUsers: number;
    bookingDate: string;
    startTime: string;
    endTime: string;
    totalPayment: number;
    bookingStatus: string;
    feedback: string;

    constructor(id:string, username:string, roomName:string, roomType:string, noOfUsers:number, bookingDate:string, startTime:string, endTime:string, totalPayment:number, bookingStatus:string, feedback:string){
        this.id = id;
        this.username = username;
        this.roomName = roomName;
        this.roomType = roomType;
        this.noOfUsers = noOfUsers;
        this.bookingDate = bookingDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalPayment = totalPayment;
        this.bookingStatus = bookingStatus;
        this.feedback = feedback;
    }
}
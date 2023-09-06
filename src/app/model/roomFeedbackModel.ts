export class RoomFeedback{
    roomNo:string;
    cozyness:number;
    quietness:number;
    comfortness:number;

    constructor(roomNo:string, cozyness:number, quietness:number, comfortness:number){
        this.roomNo = roomNo;
        this.cozyness = cozyness;
        this.quietness = quietness;
        this.comfortness = comfortness;
    }

}
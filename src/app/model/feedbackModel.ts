export class Feedback{
    id: number;
    name:string;
    email:string;
    comment:string;
    date: string;
    read: boolean;

    constructor(id:number, name:string, email:string, comment:string, date:string, read:boolean){
        this.id = id;
        this.name = name;
        this.email = email;
        this.comment = comment;
        this.date = date;
        this.read = read;
    }
}
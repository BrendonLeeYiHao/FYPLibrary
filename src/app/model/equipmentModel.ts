export class Equipment{
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;

    constructor(id:string, name:string, description: string, price: number, stock:number, image:string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image = image;
    }
}
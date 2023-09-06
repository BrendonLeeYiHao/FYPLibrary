import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() { }

  generateRandomNumber():string{
    const min = 1;
    const max = 999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    const formattedNum = randomNum.toString().padStart(3, '0');

    console.log(formattedNum);
    return formattedNum;
  }



}

import { Injectable } from '@angular/core';
import { Throw } from './throw';
@Injectable({
  providedIn: 'root'
})
export class ThrowerServiceService {

  numberOfDie: number = 1;
  reasonThrow: string= "";
  totalThrows: number = 0;
  throws: Throw[] = [];
  constructor() { }

  updateSettings(n:number,r:string) {
    if (n > 0)
    {
      if (n <= 20)
      {
        this.numberOfDie = n;
        console.log("n is: " + n);
      }
    }
    this.reasonThrow = r;
   
  }
  
}

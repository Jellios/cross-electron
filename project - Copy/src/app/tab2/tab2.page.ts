import { Component, OnInit } from '@angular/core';
import { ThrowerServiceService } from '../thrower-service.service';
import { Throw } from '../throw';
import { Dice } from '../dice';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {



  values: number[] = [];
  ids: string[] = [];


  constructor(private throwerService: ThrowerServiceService) {

  }
  ngOnInit(): void {
   
  }
  ionViewDidEnter(): void {
   
    if (this.throwerService.throws.length != 0)
    {
      this.RollDicesWithPresetValues();
      console.log("met values");
    }
    else
    {
      this.RollDices();
      console.log("zonder values");
    }
    
  }
  RollDicesWithPresetValues(): void {
    // Get the last throw from the service
    const lastThrow = this.throwerService.throws[this.throwerService.throws.length - 1];
    console.log("lastthrow: " + lastThrow.total2WasThrowed);
    // If there is a last throw
    if (lastThrow) {
      this.values = [];
      this.ids = [];

      for (let i = 0; i < lastThrow.total1WasThrowed; i++) {
        let d = new Dice();
        d.value = 1;
        d.id = this.generateRandomString();
        lastThrow.dices.push(d);
        this.values.push(1);
        this.ids.push(d.id);
      }
      for (let i = 0; i < lastThrow.total2WasThrowed; i++) {
        let d = new Dice();
        d.value = 2;
        d.id = this.generateRandomString();
        lastThrow.dices.push(d);
        this.values.push(2);
        this.ids.push(d.id);
      }
      for (let i = 0; i < lastThrow.total3WasThrowed; i++) {
        let d = new Dice();
        d.value = 3;
        d.id = this.generateRandomString();
        lastThrow.dices.push(d);
        this.values.push(3);
        this.ids.push(d.id);
      }
      for (let i = 0; i < lastThrow.total4WasThrowed; i++) {
        let d = new Dice();
        d.value = 4;
        d.id = this.generateRandomString();
        lastThrow.dices.push(d);
        this.values.push(4);
        this.ids.push(d.id);
      }
      for (let i = 0; i < lastThrow.total5WasThrowed; i++) {
        let d = new Dice();
        d.value = 5;
        d.id = this.generateRandomString();
        lastThrow.dices.push(d);
        this.values.push(5);
        this.ids.push(d.id);
      }
      for (let i = 0; i < lastThrow.total6WasThrowed; i++) {
        let d = new Dice();
        d.value = 6;
        d.id = this.generateRandomString();
        lastThrow.dices.push(d);
        this.values.push(6);
        this.ids.push(d.id);
      }

      // For each dice in the last throw
      for (let i = 0; i < lastThrow.dices.length; i++) {
        // Use the value from the last throw
        this.values[i] = lastThrow.dices[i].value;
        // Generate a new id
        this.ids[i] = lastThrow.dices[i].id;
      }
    } else {
      console.error('No throws in the service');
    }
  }
  RollDices(): void {
    console.log("rolling");
    this.values = [];
    this.ids = [];

    for (let i = 0; i < this.throwerService.numberOfDie; i++) {
      this.values[i] = Math.floor(Math.random() * 6) + 1;
      this.ids[i] = this.generateRandomString();
    }
    this.throwerService.totalThrows++;
    let throwInstance = new Throw();
    for (let i = 0; i < this.throwerService.numberOfDie; i++) {
      let tmpDice = new Dice();
      tmpDice.id = this.ids[i];
      tmpDice.value = this.values[i];
      throwInstance.dices[i] = tmpDice;
      switch (tmpDice.value) {
        case 1: throwInstance.total1WasThrowed++; break;
        case 2: throwInstance.total2WasThrowed++; break;
        case 3: throwInstance.total3WasThrowed++; break;
        case 4: throwInstance.total4WasThrowed++; break;
        case 5: throwInstance.total5WasThrowed++; break;
        case 6: throwInstance.total6WasThrowed++; break;
      }
      throwInstance.totalNumberOfEyes += tmpDice.value;
    }
    throwInstance.reasonThrow = this.throwerService.reasonThrow;
    throwInstance.numberThrow = this.throwerService.totalThrows;
    throwInstance.numberDices = this.throwerService.numberOfDie;
    this.throwerService.throws.push(throwInstance);
  }
  get ThrowerService() {
    return this.throwerService;
  }
  ionViewDidLeave(): void {
    this.values = [];
    this.ids = [];
    console.log("left");
  }

  screenOrientation(): string {
    return screen.orientation.type;
  }
  screenWidth(): number {
    return screen.width;
  }
  shownGroup: Throw = new Throw();

  toggleGroup(group: Throw) {
    if (this.isGroupShown(group)) {
      this.shownGroup = new Throw();
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group: Throw) {
    return this.shownGroup === group;
  }
  generateRandomString(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 50; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}

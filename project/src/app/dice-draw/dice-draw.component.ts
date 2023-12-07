import { Component, Input, OnInit, AfterViewInit, HostListener, NgZone } from '@angular/core';
import { ThrowerServiceService } from '../thrower-service.service';




@Component({
  selector: 'app-dice-draw',
  templateUrl: './dice-draw.component.html',
  styleUrls: ['./dice-draw.component.scss'],
})
export class DiceDrawComponent implements AfterViewInit   {

   @Input() canvasID: string = "";
   @Input() diceValue: number = 1;
  constructor(private throwerService: ThrowerServiceService,private zone:NgZone) {}

  

  async ngAfterViewInit() {
    
    if (this.canvasID != "") {
     
      this.drawDice();
      
    }
    screen.orientation.addEventListener('change', () => {
      this.zone.run(() => {
        console.log("screen orientation: " + screen.orientation.type);
        console.log("zone runned");
        setTimeout(() => {
          this.drawDice();
        }, 50);
      });
    });
  }
  

  drawDice() {
    const canvas = document.getElementById(this.canvasID) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

  if (screen.orientation.type == "landscape-primary")
  {
    canvas.width = (window.innerWidth/100)*15;
    canvas.height = (window.innerWidth/100)*15;
  }
  else
  {
    canvas.width = (window.innerWidth/100)*20;
    canvas.height = (window.innerWidth/100)*20 ;
  }
  
    
    console.log("canvas width: " + canvas.width);
    console.log("screen width: " + screen.width)
    const dotSize = (canvas.width / 100) *13;
  
    if (ctx) {
     // Clear the canvas
     //ctx.clearRect(0, 0, canvas.width, canvas.height);
   
     // Set the background color
     ctx.fillStyle = "white";
     ctx.fillRect(0, 0, canvas.width, canvas.height);
   
     // Generate a random number between 1 and 6
    // let x = Math.floor(Math.random() * 6) + 1;
      let x = this.diceValue;
     // Draw the dice
     ctx.beginPath();
     ctx.rect(0, 0, canvas.width, canvas.height);
     ctx.stroke();
   
     // Set the color of the dots
     ctx.fillStyle = "lime";
   //x=6;
     // Draw the dots based on the number
     switch (x) {
       case 1:
         ctx.fillRect(canvas.width / 2 - (dotSize/2), canvas.height / 2 - (dotSize/2), dotSize, dotSize);
         break;
          case 2:
         //   ctx.fillRect(canvas.width / 2 - (dotSize/2), canvas.height / 2 - (dotSize/2), 10, 10);
           // ctx.fillRect(canvas.width / 4 - (dotSize/2), canvas.height / 4 - (dotSize/2), 10, 10);
       //    ctx.fillRect(15,15,10,10);
          // ctx.fillRect(50,50,10,10);

          ctx.fillRect(canvas.width / 4 - (dotSize/2), canvas.height / 4 - (dotSize/2), dotSize, dotSize);
          ctx.fillRect(3 * canvas.width / 4 - (dotSize/2), 3 * canvas.height / 4 - (dotSize/2), dotSize, dotSize);
            break;
       case 3:
         ctx.fillRect(canvas.width / 2 - (dotSize/2), canvas.height / 2 - (dotSize/2), dotSize, dotSize);
         ctx.fillRect(canvas.width / 4 - (dotSize/2), canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         ctx.fillRect(3 * canvas.width / 4 - (dotSize/2), 3 * canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         break;
       case 4:
         ctx.fillRect(canvas.width / 4 - (dotSize/2), canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         ctx.fillRect(3 * canvas.width / 4 - (dotSize/2), canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         ctx.fillRect(canvas.width / 4 - (dotSize/2), 3 * canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         ctx.fillRect(3 * canvas.width / 4 - (dotSize/2), 3 * canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         break;
       case 5:
         ctx.fillRect(canvas.width / 2 - (dotSize/2), canvas.height / 2 - (dotSize/2), dotSize, dotSize);
         ctx.fillRect(canvas.width / 4 - (dotSize/2), canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         ctx.fillRect(3 * canvas.width / 4 - (dotSize/2), canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         ctx.fillRect(canvas.width / 4 - (dotSize/2), 3 * canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         ctx.fillRect(3 * canvas.width / 4 - (dotSize/2), 3 * canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         break;
       case 6:
        
       //left top
         ctx.fillRect(canvas.width / 4 - (dotSize/2), canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         //right top
         ctx.fillRect(3 * canvas.width / 4 - (dotSize/2), canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         //left bottom
         ctx.fillRect(canvas.width / 4 - (dotSize/2), 3 * canvas.height / 4 - (dotSize/2), dotSize, dotSize);
         //right bottom
         ctx.fillRect(3 * canvas.width / 4 - (dotSize/2), 3 * canvas.height / 4 - (dotSize/2), dotSize, dotSize);
        //left middle
         ctx.fillRect(canvas.width / 4 - (dotSize/2), canvas.height / 2 - (dotSize/2), dotSize, dotSize);
         //right middle
         ctx.fillRect(3* canvas.width /4 - (dotSize/2), canvas.height / 2 - (dotSize/2), dotSize, dotSize);
         break;
     }
    } else {
     console.error('Failed to get canvas context');
    } 
   }
   
}
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
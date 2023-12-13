import { Component, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
 selector: 'app-comp-voor-modal',
 templateUrl: './comp-voor-modal-component.component.html',
 styleUrls: ['./comp-voor-modal-component.component.scss'],
})
export class CompVoorModalComponent {
 userInput: string = "";
 
 @Output() confirm = new EventEmitter<string>();
 @Output() cancel = new EventEmitter<void>();

 constructor(private modalController: ModalController) {}
 continue() { 
  this.modalController.dismiss(this.userInput);
}

 cancelModal() {
   this.cancel.emit();
   this.modalController.dismiss();
 }
}

import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThrowerServiceService } from '../thrower-service.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  reply='';
  electronVersion = '';
  valueOk: boolean = false;
  form!: FormGroup;
  constructor(private fb:FormBuilder, private throwerservice: ThrowerServiceService, private ngZone: NgZone) {
    this.form = this.fb.group({
      'nOfDie': [1, {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      'reason': [null]
     });
     this.electronVersion = window.api.getElectronVersion();
     window.api.ipcSendToMain();
     window.api.ipcReceiveReplyFromMain('do-a-thing-reply',(event: any, arg: any) => {
     console.log(arg);
     this.ngZone.run(() => {
      this.reply = arg;
  });
  });
  }
  ngOnInit(): void {
    
   // console.log('Form controls:', this.form.controls);
   }
  ionViewWillEnter() {
    console.log("test");
    
  }
  onSaveSettings() {
  //  console.log("ikkee submiteted");
  console.log('Form valid: ' + this.form.valid);
  console.log(this.nOfDie);
    this.throwerservice.updateSettings(this.nOfDie.value,this.reason.value);
  }
  get nOfDie(): FormControl  {
    return this.form.controls['nOfDie'] as FormControl;
  }
  get reason(): FormControl {
    return this.form.controls['reason'] as FormControl;
  }
  checkNum(control: FormControl): boolean {
    console.log("testttt");
    return control.value > 0 && control.value <= 20;
  }
}

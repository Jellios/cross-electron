import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory, Encoding, FileInfo } from '@capacitor/filesystem';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CompVoorModalComponent } from './comp-voor-modal-component/comp-voor-modal-component.component';
import { ThrowerServiceService } from '../thrower-service.service';
import { Throw } from '../throw';
import { NgZone } from '@angular/core';

@Component({
 selector: 'app-tab3',
 templateUrl: 'tab3.page.html',
 styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

 constructor(private modalController: ModalController, private throwerService: ThrowerServiceService, private ngZone: NgZone) {
 }
 fileList: FileInfo[] = [];
ngOnInit(): void {
  this.getFiles();
}
 async presentModal() {
  const modal = await this.modalController.create({
    component: CompVoorModalComponent,
  });
 
  modal.onDidDismiss().then((detail) => {
    if (detail.data) {
      console.log('Confirmed with file name:', detail.data);
      this.writeFile(detail.data);
    } else {
      console.log('Modal cancelled');
    }
  });
 
  return await modal.present();
 }
 

 async writeFile(fileName: string) {
  try {
    // Create the directory if it doesn't exist
    try
    {
      await Filesystem.mkdir({
        path: 'throwLists',
        directory: Directory.Documents,
        recursive: true,
      });
    }
    catch(error)
    {
      console.log("directory already exists");
    }
   

    // Get the throws list from the service
    const throwsList = this.throwerService.throws;

    // Convert the throws list into a string
    const data = throwsList.map((throwItem) => {
      return `${throwItem.numberThrow},${throwItem.numberDices},${throwItem.totalNumberOfEyes},${throwItem.reasonThrow},${throwItem.total1WasThrowed},${throwItem.total2WasThrowed},${throwItem.total3WasThrowed},${throwItem.total4WasThrowed},${throwItem.total5WasThrowed},${throwItem.total6WasThrowed}`;
    }).join('\n');

    // Write the file
    await Filesystem.writeFile({
      path: `throwLists/${fileName}.txt`,
      data: data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    // Update the view
    this.ngZone.run(() => {
      this.getFiles();
    });

    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file', error);
  }
}

async getFiles() {
  try {
    try
    {
      await Filesystem.mkdir({
        path: 'throwLists',
        directory: Directory.Documents,
        recursive: true,
      });
    }
    catch(error)
    {
      console.log("directory already exists");
    }
    const result = await Filesystem.readdir({
      path: 'throwLists',
      directory: Directory.Documents
    });
    this.fileList = result.files;
    console.log('Files in directory', result.files);
  } catch (error) {
    console.error('Error reading directory', error);
  }
}
async readFile(fileName: string) {
  try {
    const result = await Filesystem.readFile({
      path: `throwLists/${fileName}.txt`,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    console.log('File read successfully', result.data);
  } catch (error) {
    console.error('Error reading file', error);
  }
}
async loadThrows(fileName: string) {
  try {
    console.log(fileName);
    // Read the file
    const result = await Filesystem.readFile({
      path: `throwLists/${fileName}`,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.log("load throws called");
    if (typeof result.data === 'string') {
      // Split the file content into lines
      const lines = result.data.split('\n');

      // Clear the throws array in the service
      this.throwerService.throws = [];

      // Parse each line and add it to the throws array
      for (let line of lines) {
        const parts = line.split(',');
        const throwItem = new Throw();
        throwItem.numberThrow = parseInt(parts[0]);
        throwItem.numberDices = parseInt(parts[1]);
        throwItem.totalNumberOfEyes = parseInt(parts[2]);
        throwItem.reasonThrow = parts[3];
        throwItem.total1WasThrowed = parseInt(parts[4]);
        throwItem.total2WasThrowed = parseInt(parts[5]);
        throwItem.total3WasThrowed = parseInt(parts[6]);
        throwItem.total4WasThrowed = parseInt(parts[7]);
        throwItem.total5WasThrowed = parseInt(parts[8]);
        throwItem.total6WasThrowed = parseInt(parts[9]);
        this.throwerService.throws.push(throwItem);
      }
      this.throwerService.totalThrows = this.throwerService.throws.length;

      console.log('Throws loaded successfully');
    } else {
      console.error('Error: File data is not a string');
    }
  } catch (error) {
    console.error('Error loading throws', error);
  }
}
parseThrow(line: string): Throw {
  // Parse the line into a Throw object
  // This depends on the format of your throws in the file
  // Here's an example:
  const parts = line.split(', ');
  const throwItem = new Throw();
  throwItem.numberThrow = parseInt(parts[0]);
  throwItem.numberDices = parseInt(parts[1]);
  throwItem.totalNumberOfEyes = parseInt(parts[2]);
  throwItem.reasonThrow = parts[3];
  // ... set the other properties of throwItem based on parts
  return throwItem;
}
}

import { Injectable, NgZone } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public showProgress = false;

  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 1000
    this.zone.run(() => {
      this.snackBar.open(message, null, config);
    });
  }

  showMessage(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-green'];
    config.duration = 1000
    this.zone.run(() => {
    this.snackBar.open(message, null, config);
    });
  }
}
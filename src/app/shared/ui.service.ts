import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {

  constructor(private snack: MatSnackBar){}
  showSnackbar(message, action, duration) {
    this.snack.open(message, action, {duration});
  }
}
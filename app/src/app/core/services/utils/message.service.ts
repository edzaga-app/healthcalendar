import { Injectable } from '@angular/core';
import { MatSnackBar, 
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
 } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public snackBar: MatSnackBar) { }

  open(message: string) {
    this.snackBar.open(message, 'Salir', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition 
    })
  }

}

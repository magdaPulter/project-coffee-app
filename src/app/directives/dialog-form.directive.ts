import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Directive({
  selector: '[dialogForm]',
  standalone: true
})
export class DialogFormDirective {
  // @Input() dialogForm!: boolean 
  // @Input() dialogForm!: string
  // @Output() operation: EventEmitter<string> = new EventEmitter<string>()
  constructor(private _matDialog: MatDialog) { }
  
  @HostListener('click')
  openDialog() {
    const dialogRef = this._matDialog.open(
      DialogComponent, 
    )
    dialogRef
      .afterClosed()
      .subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
          // this.operation.emit(this.dialogForm)
      });      
  }
}

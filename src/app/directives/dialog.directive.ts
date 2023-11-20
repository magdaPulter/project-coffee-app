import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Directive({
  selector: '[dialog]',
  standalone: true,
})
export class DialogDirective {
  @Input() dialog: string = ''
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private _matDialog: MatDialog) { }

  @HostListener('click')
  openDialog() {
    const dialogRef = this._matDialog.open(
      DialogComponent
      )
    dialogRef
      .afterClosed()
      .subscribe(result => this.confirmed.emit(result)
      )
  }



}

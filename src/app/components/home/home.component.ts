import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { CoffeeListComponent } from '../coffee-list/coffee-list.component';
import { CoffeeModel } from '../../models/coffee.model';
import { CoffeeService } from '../../services/coffee.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatCheckboxModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, CoffeeListComponent]
})
export class HomeComponent {
  private _refreshListSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
  readonly coffeeList$: Observable<CoffeeModel[]> = this._refreshListSubject.asObservable().pipe(
    switchMap(() => this._coffeeService.getAll())
  )
  constructor(private _matDialog: MatDialog, private _coffeeService: CoffeeService) { }



  openDialog() {
    const dialogRef = this._matDialog.open(
      DialogComponent
    )
    dialogRef
      .afterClosed()
      .subscribe(()=>{
        this._refreshListSubject.next()
      }
    );
  }

}

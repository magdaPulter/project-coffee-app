import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CoffeeListComponent } from '../coffee-list/coffee-list.component';
import { CoffeeWithUrlQueryModel } from '../../querymodels/coffeeWithUrl.querymodel';
import { CoffeeService } from '../../services/coffee.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { InventorySummaryComponent } from '../inventory-summary/inventory-summary.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    CoffeeListComponent,
    InventorySummaryComponent,
    NavComponent,
  ],
})
export class HomeComponent {
  private _refreshListSubject: BehaviorSubject<void> =
    new BehaviorSubject<void>(void 0);
  readonly coffeeList$: Observable<CoffeeWithUrlQueryModel[]> =
    this._refreshListSubject
      .asObservable()
      .pipe(switchMap(() => this._coffeeService.getAllWithUrl()));

  constructor(
    private _matDialog: MatDialog,
    private _coffeeService: CoffeeService
  ) {}

  openDialog() {
    const dialogRef = this._matDialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this._refreshListSubject.next();
    });
  }

  coffeeDeleted(id: number) {
    const dialogRef = this._matDialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._coffeeService.delete(id).subscribe(() => {
          this._refreshListSubject.next();
        });
      }
    });
  }
  coffeeUpdated(coffee: CoffeeWithUrlQueryModel) {
    const dialogRef = this._matDialog.open(DialogComponent, {
      data: coffee,
    });

    dialogRef.afterClosed().subscribe(() => {
      this._refreshListSubject.next();
    });
  }
}

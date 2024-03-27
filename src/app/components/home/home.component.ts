import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CoffeeListComponent } from '../coffee-list/coffee-list.component';
import { CoffeeWithUrlQueryModel } from '../../querymodels/coffeeWithUrl.querymodel';
import { CoffeeService } from '../../services/coffee.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { InventorySummaryComponent } from '../inventory-summary/inventory-summary.component';
import { NavComponent } from '../nav/nav.component';
import { FilterOptionsComponent } from '../filter-options/filter-options.component';
import { FiltersListComponent } from '../filters-list/filters-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

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
    ReactiveFormsModule,
    FilterOptionsComponent,
    FiltersListComponent,
    MatExpansionModule,
  ],
})
export class HomeComponent {
  readonly search: FormControl = new FormControl('');
  panelOpenState = false;

  private _filtersVisibleSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public filtersVisible$: Observable<boolean> =
    this._filtersVisibleSubject.asObservable();

  private _refreshListSubject: BehaviorSubject<void> =
    new BehaviorSubject<void>(void 0);
  readonly coffeeList$: Observable<CoffeeWithUrlQueryModel[]> =
    this._refreshListSubject
      .asObservable()
      .pipe(switchMap(() => this._coffeeService.getAllWithUrl()));

  readonly searchedCoffeeList$: Observable<CoffeeWithUrlQueryModel[]> =
    combineLatest([
      this.search.valueChanges.pipe(startWith('')),
      this.coffeeList$,
    ]).pipe(
      map(([searchedValue, list]) => {
        if (searchedValue === '') {
          return list;
        } else {
          return list.filter((product) =>
            product.name.toLowerCase().includes(searchedValue.toLowerCase())
          );
        }
      })
    );
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

  onFilters(isVisible: boolean) {
    this._filtersVisibleSubject.next(isVisible);
  }
}

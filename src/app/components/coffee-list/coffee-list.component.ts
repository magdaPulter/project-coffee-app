import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeService } from '../../services/coffee.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CoffeeWithUrlQueryModel } from 'src/app/querymodels/coffeeWithUrl.querymodel';
import { MatTableModule } from '@angular/material/table';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { CoffeeModel } from 'src/app/models/coffee.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss'],
  imports: [CommonModule, RouterLink, MatButtonModule, MatTableModule],
})
export class CoffeeListComponent {
  @Input() coffeeList!: CoffeeWithUrlQueryModel[];

  displayedColumns: string[] = [
    'image',
    'name',
    'category',
    'unitPrice',
    'inStock',
    'discount',
    'status',
    'totalValue',
    'remove',
  ];

  constructor(
    private _coffeeService: CoffeeService,
    private _router: Router,
    private _matDialog: MatDialog
  ) {}

  onDelete(id: number) {
    const dialogRef = this._matDialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._coffeeService.delete(id).subscribe(() => {
          this._router.navigate(['']);
        });
      }
    });
  }
  onUpdate(coffee: CoffeeModel) {
    const dialogRef = this._matDialog.open(DialogComponent, {
      data: coffee,
    });

    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate([``]);
    });
  }
}

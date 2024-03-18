import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CoffeeWithUrlQueryModel } from 'src/app/querymodels/coffeeWithUrl.querymodel';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss'],
  imports: [CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule],
})
export class CoffeeListComponent {
  @Input() coffeeList!: CoffeeWithUrlQueryModel[];
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() updated: EventEmitter<CoffeeWithUrlQueryModel> =
    new EventEmitter<CoffeeWithUrlQueryModel>();

  displayedColumns: string[] = [
    'action',
    'name',
    'category',
    'unitPrice',
    'inStock',
    'discount',
    'totalValue',
    'status',
    'delete',
  ];

  onDelete(id: number) {
    this.deleted.emit(id);
  }

  onUpdate(coffee: CoffeeWithUrlQueryModel) {
    this.updated.emit(coffee);
  }
}

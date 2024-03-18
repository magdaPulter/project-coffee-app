import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CoffeeWithUrlQueryModel } from 'src/app/querymodels/coffeeWithUrl.querymodel';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss'],
  imports: [CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule],
})
export class CoffeeListComponent implements AfterViewInit {
  @Input() coffeeList!: CoffeeWithUrlQueryModel[];
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() updated: EventEmitter<CoffeeWithUrlQueryModel> =
    new EventEmitter<CoffeeWithUrlQueryModel>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<CoffeeWithUrlQueryModel>();

  ngOnChanges(changes: SimpleChanges): void {
    const coffeeList = changes['coffeeList'].currentValue;
    this.dataSource = new MatTableDataSource<CoffeeWithUrlQueryModel>(
      coffeeList
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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

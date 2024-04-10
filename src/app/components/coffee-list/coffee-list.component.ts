import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableResponsiveDirective } from '../../directives/mat-table-responsive.directive';
import { CoffeeWithUrlQueryModel } from '../../querymodels/coffeeWithUrl.querymodel';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss'],

  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableResponsiveDirective,
  ],
})
export class CoffeeListComponent implements AfterViewInit {
  @Input() coffeeList!: CoffeeWithUrlQueryModel[];
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() updated: EventEmitter<CoffeeWithUrlQueryModel> =
    new EventEmitter<CoffeeWithUrlQueryModel>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  mobile = false;
  dataSource = new MatTableDataSource<CoffeeWithUrlQueryModel>();

  private _isMobileViewSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isMobileView$: Observable<boolean> =
    this._isMobileViewSubject.asObservable();

  private _displayedColumnsSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>([
      'action',
      'name',
      'category',
      'unitPrice',
      'inStock',
      'discount',
      'totalValue',
      'status',
      'delete',
    ]);
  public displayedColumns$: Observable<string[]> =
    this._displayedColumnsSubject.asObservable();

  ngOnChanges(changes: SimpleChanges): void {
    const coffeeList = changes['coffeeList'].currentValue;
    this.dataSource = new MatTableDataSource<CoffeeWithUrlQueryModel>(
      coffeeList
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(id: number) {
    this.deleted.emit(id);
  }

  onUpdate(coffee: CoffeeWithUrlQueryModel) {
    this.updated.emit(coffee);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    const mobileDisplayedColumns: string[] = [
      'action',
      'name',
      'category',
      'delete',
    ];

    const DesctopDisplayedColumns: string[] = [
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

    if (width < 965) {
      this._isMobileViewSubject.next(true);
      this._displayedColumnsSubject.next(mobileDisplayedColumns);
    } else {
      this._isMobileViewSubject.next(false);
      this._displayedColumnsSubject.next(DesctopDisplayedColumns);
    }
  }
}

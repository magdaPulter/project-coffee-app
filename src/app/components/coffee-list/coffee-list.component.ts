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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableResponsiveDirective } from '../../directives/table-responsive.directive';
import { CoffeeWithUrlQueryModel } from '../../querymodels/coffeeWithUrl.querymodel';
import { MobileViewModel } from 'src/app/models/mobile-view.model';
import { TranslateModule } from '@ngx-translate/core';

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
    TableResponsiveDirective,
    TranslateModule,
  ],
})
export class CoffeeListComponent implements AfterViewInit {
  @Input() coffeeList!: CoffeeWithUrlQueryModel[];
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() updated: EventEmitter<CoffeeWithUrlQueryModel> =
    new EventEmitter<CoffeeWithUrlQueryModel>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private desctopDisplayedColumns: string[] = [
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
  dataSource = new MatTableDataSource<CoffeeWithUrlQueryModel>();

  private _isMobileViewSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isMobileView$: Observable<boolean> =
    this._isMobileViewSubject.asObservable();

  private _displayedColumnsSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>(this.desctopDisplayedColumns);
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
  changeView(isMobile: MobileViewModel) {
    this._isMobileViewSubject.next(isMobile.isMobile);
    this._displayedColumnsSubject.next(isMobile.columns);
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoffeeWithUrlQueryModel } from '../../querymodels/coffeeWithUrl.querymodel';
import { CoffeeModel } from '../../models/coffee.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBagShopping,
  faChartLine,
  faFolderClosed,
  faPercent,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inventory-summary',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './inventory-summary.component.html',
  styleUrls: ['./inventory-summary.component.scss'],
})
export class InventorySummaryComponent implements OnChanges {
  @Input() coffeeList!: CoffeeWithUrlQueryModel[];
  @Output() productAdded: EventEmitter<void> = new EventEmitter<void>();

  faBagShopping = faBagShopping;
  faChartLine = faChartLine;
  faFolderClosed = faFolderClosed;
  faTriangleExclamation = faTriangleExclamation;
  faPercent = faPercent;

  private _currentCoffeeListSubject: BehaviorSubject<
    CoffeeWithUrlQueryModel[]
  > = new BehaviorSubject<CoffeeWithUrlQueryModel[]>(this.coffeeList);
  public currentCoffeeList$: Observable<CoffeeWithUrlQueryModel[]> =
    this._currentCoffeeListSubject.asObservable();

  ngOnChanges(changes: SimpleChanges): void {
    this._currentCoffeeListSubject.next(changes['coffeeList'].currentValue);
  }

  readonly unPublished$: Observable<number> = this.currentCoffeeList$.pipe(
    map((list) => {
      return list.filter((product) => {
        return product.unPublished;
      }).length;
    })
  );

  readonly lowStock$: Observable<number> = this.currentCoffeeList$.pipe(
    map((list) => {
      return list.filter((product) => {
        return +product.quantity < 5;
      }).length;
    })
  );

  readonly discounted$: Observable<number> = this.currentCoffeeList$.pipe(
    map((list) => {
      return list.filter((product) => {
        return +product.discount > 0;
      }).length;
    })
  );

  addNewProduct() {
    this.productAdded.emit();
  }
}

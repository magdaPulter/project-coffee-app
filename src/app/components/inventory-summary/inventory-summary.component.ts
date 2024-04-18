import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoffeeWithUrlQueryModel } from '../../querymodels/coffeeWithUrl.querymodel';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-inventory-summary',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './inventory-summary.component.html',
  styleUrls: ['./inventory-summary.component.scss'],
})
export class InventorySummaryComponent {
  @Input() coffeeList!: CoffeeWithUrlQueryModel[];
  @Output() productAdded: EventEmitter<void> = new EventEmitter<void>();

  private _currentCoffeeListSubject: BehaviorSubject<
    CoffeeWithUrlQueryModel[]
  > = new BehaviorSubject<CoffeeWithUrlQueryModel[]>(this.coffeeList);
  public currentCoffeeList$: Observable<CoffeeWithUrlQueryModel[]> =
    this._currentCoffeeListSubject.asObservable();

  getUnpublished() {
    return this.coffeeList.filter((product) => {
      return product.unPublished;
    }).length;
  }
  getLowStock() {
    return this.coffeeList.filter((product) => {
      return +product.quantity < 5;
    }).length;
  }

  getDiscounted() {
    return this.coffeeList.filter((product) => {
      return +product.discount > 0;
    }).length;
  }

  addNewProduct() {
    this.productAdded.emit();
  }
}

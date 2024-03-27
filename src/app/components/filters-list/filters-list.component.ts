import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CoffeeWithUrlQueryModel } from '../../querymodels/coffeeWithUrl.querymodel';

@Component({
  selector: 'app-filters-list',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss'],
})
export class FiltersListComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  readonly categories: string[] = ['Coffee', 'Accesories'];
  @Input() coffeeList!: CoffeeWithUrlQueryModel[];

  readonly filterForm: FormGroup = new FormGroup({
    category: new FormControl(),
    price: new FormControl(),
    discount: new FormControl(),
    published: new FormControl(),
  });

  value = 0;

  private _maxValueSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public maxValue$: Observable<number> = this._maxValueSubject.asObservable();
  private _minValueSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public minValue$: Observable<number> = this._minValueSubject.asObservable();

  constructor(private _router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    const array = this.coffeeList.map((list) => +list.price);

    this._maxValueSubject.next(Math.max(...array));
    this._minValueSubject.next(Math.min(...array));
  }

  ngAfterViewInit() {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(200),
        tap((filters) => {
          this._router.navigate([], {
            queryParams: {
              category: filters.category,
              price: filters.price,
              discount: filters.discount,
              published: filters.published,
            },
          });
        })
      )
      .subscribe();
  }
  ngOnDestroy() {
    this._router.navigate([], {
      queryParams: {},
    });
  }
}

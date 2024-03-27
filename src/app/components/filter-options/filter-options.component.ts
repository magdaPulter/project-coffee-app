import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-filter-options',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss'],
})
export class FilterOptionsComponent {
  @Output() filtersVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _filtersVisibleSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public filtersVisible$: Observable<boolean> =
    this._filtersVisibleSubject.asObservable();
    
  onFilterClicked() {
    this._filtersVisibleSubject.next(!this._filtersVisibleSubject.getValue());
    this.filtersVisible.emit(this._filtersVisibleSubject.getValue());
  }
}

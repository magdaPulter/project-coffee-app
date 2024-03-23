import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-options',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss'],
})
export class FilterOptionsComponent {
  filtersGroup: FormGroup = new FormGroup({
    category: new FormControl(),
    price: new FormControl(),
    stock: new FormControl(),
    discount: new FormControl(),
    published: new FormControl(),
  });
  readonly filtersOption: string[] = [
    'Category',
    'Price',
    'Stock',
    'Discount',
    'Published',
  ];
}

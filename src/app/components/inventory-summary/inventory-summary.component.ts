import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  faBagShopping,
  faChartLine,
  faFolderClosed,
  faTriangleExclamation,
  faPercent,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-inventory-summary',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './inventory-summary.component.html',
  styleUrls: ['./inventory-summary.component.scss'],
})
export class InventorySummaryComponent {
  @Output() productAdded: EventEmitter<void> = new EventEmitter<void>();

  faBagShopping = faBagShopping;
  faChartLine = faChartLine;
  faFolderClosed = faFolderClosed;
  faTriangleExclamation = faTriangleExclamation;
  faPercent = faPercent;

  addNewProduct() {
    this.productAdded.emit();
  }
}

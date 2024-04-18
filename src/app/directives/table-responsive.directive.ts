import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MobileViewModel } from '../models/mobile-view.model';

@Directive({
  selector: '[tableResponsive]',
  standalone: true,
})
export class TableResponsiveDirective {
  @Output() isMobile: EventEmitter<MobileViewModel> =
    new EventEmitter<MobileViewModel>();
  private mobileDisplayedColumns: string[] = [
    'action',
    'name',
    'category',
    'delete',
  ];

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
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = window.innerWidth;
    if (width < 965) {
      this.isMobile.emit({
        isMobile: true,
        columns: this.mobileDisplayedColumns,
      });
    } else {
      this.isMobile.emit({
        isMobile: false,
        columns: this.desctopDisplayedColumns,
      });
    }
  }
}

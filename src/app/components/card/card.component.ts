import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ShortDescriptionPipe } from 'src/app/pipes/short-description.pipe';
import { CoffeeWithUrlQueryModel } from 'src/app/querymodels/coffeeWithUrl.querymodel';
// import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    ShortDescriptionPipe,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() coffee!: CoffeeWithUrlQueryModel;
}

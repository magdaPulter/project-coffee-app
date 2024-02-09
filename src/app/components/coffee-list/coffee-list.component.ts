import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeService } from '../../services/coffee.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { CoffeeModel } from 'src/app/models/coffee.model';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss'],
  imports: [CommonModule, CardComponent, RouterLink, MatButtonModule],
})
export class CoffeeListComponent {
  @Input() coffeeList!: CoffeeModel[];
}

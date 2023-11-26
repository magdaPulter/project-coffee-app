import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeService } from '../../services/coffee.service';
import { Observable } from 'rxjs';
import { CoffeeModel } from 'src/app/models/coffee.model';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coffee-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss']
})
export class CoffeeListComponent {
  

  readonly coffeeList$: Observable<CoffeeModel[]> = this._coffeeService.getAll()

  constructor(private _coffeeService: CoffeeService) {
  }
}

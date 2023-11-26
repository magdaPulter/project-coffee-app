import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoffeeService } from '../../services/coffee.service';
import { map, Observable, switchMap } from 'rxjs';
import { CoffeeModel } from 'src/app/models/coffee.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  readonly coffeeDetail$: Observable<CoffeeModel> = this._activatedRoute.params.pipe(
    switchMap(params =>   this._coffeeService.getOne(params['id']))
  )
  
  constructor(private _coffeeService: CoffeeService, private _activatedRoute: ActivatedRoute) {
  }

}

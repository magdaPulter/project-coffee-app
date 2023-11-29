import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CoffeeModel } from '../../models/coffee.model';
import { CoffeeService } from '../../services/coffee.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CardComponent } from "../card/card.component";
import { DialogFormDirective } from 'src/app/directives/dialog-form.directive';

@Component({
    selector: 'app-detail',
    standalone: true,
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    imports: [CommonModule, MatButtonModule, CardComponent, DialogFormDirective]
})
export class DetailComponent {

  readonly coffeeDetail$: Observable<CoffeeModel> = this._activatedRoute.params.pipe(
    switchMap(params => this._coffeeService.getOne(+params['id']))
  )

  constructor(private _coffeeService: CoffeeService, private _activatedRoute: ActivatedRoute, private _router: Router, private _matDialog: MatDialog) {
  }

  isClicked: boolean = false

  onUpdate(coffee: CoffeeModel) {
    this._matDialog.open(
      DialogComponent, {
        data: coffee
      }
    )
  }

  onDelete(id: number) {
    this._coffeeService.delete(id).subscribe(() => {
      this._router.navigate([''])
    })
  }
}

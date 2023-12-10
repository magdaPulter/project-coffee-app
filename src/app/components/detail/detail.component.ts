import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CoffeeModel } from '../../models/coffee.model';
import { CoffeeService } from '../../services/coffee.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CardComponent } from "../card/card.component";
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { CoffeeQueryModel } from 'src/app/models/coffee.query-model';
import { TasteModel } from 'src/app/models/taste.model';
import { TASTE } from 'src/app/utils/taste';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [CommonModule, MatButtonModule, CardComponent, RouterLink]
})
export class DetailComponent {

  readonly coffeeDetail$: Observable<CoffeeModel> = this._activatedRoute.params.pipe(
    switchMap(params => this._coffeeService.getOne(+params['id']))
  )

  readonly tastes$: Observable<TasteModel[]> = of(TASTE)

  readonly characteristics$: Observable<any> = combineLatest([
    this.coffeeDetail$,
    this.tastes$,
  ]).pipe(
    map(([coffee, taste]) => {
      const characteristic = this._charArray(coffee.characteristic)
      return characteristic.map(char => {
        const charMap = taste.reduce((acc, curr) => {
          return { ...acc, [curr.id]: curr }
        }, {} as Record<string, TasteModel>)
        return {
          id: char.tasteId,
          name: charMap[char.tasteId].name
        }
      })
    })
  )


  readonly coffeeDetailWithCharacteristics$: Observable<CoffeeQueryModel> = combineLatest([
    this.coffeeDetail$,
    this.characteristics$
  ]).pipe(
    map(([coffee, taste]) => {
      const characteristic = taste
      return { ...coffee, characteristic }
    })
  )


  private _charArray(charObject: Record<number, boolean>): { name: string, tasteId: string }[] {
    return Object.entries(charObject)
      .filter(([_key, value]) => value)
      .map(([key, _value]) => key)
      .map(id => {
        return {
          name: `name ${id}`,
          tasteId: id
        }
      })
  }

  constructor(private _coffeeService: CoffeeService, private _activatedRoute: ActivatedRoute, private _router: Router, private _matDialog: MatDialog) {
  }

  onUpdate(coffee: CoffeeQueryModel) {
    const dialogRef = this._matDialog.open(
      DialogComponent, {
      data: coffee
    })

    dialogRef
      .afterClosed()
      .subscribe(() => {
        this._router.navigate([`/coffee/${coffee.id}`])
      });
  }

  onDelete(id: number) {
    const dialogRef = this._matDialog.open(
      DialogDeleteComponent)

    dialogRef
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this._coffeeService.delete(id).subscribe(() => {
            this._router.navigate([''])
          })
        }
      });
  }
}


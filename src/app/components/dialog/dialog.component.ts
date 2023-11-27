import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoffeeService } from '../../services/coffee.service';
import { TasteModel } from '../../models/taste.model';
import { TASTE } from '../../utils/TASTE';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatRadioModule, MatCheckboxModule, MatInputModule, ReactiveFormsModule, CommonModule]
})
export class DialogComponent {
  readonly coffeeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    origin: new FormControl('',[Validators.required]),
    description: new FormControl(''),
    process: new FormControl(''),
    characteristic: new FormGroup({})
  });

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private _coffeeService: CoffeeService) { }

  readonly taste$: Observable<TasteModel[]> = of(TASTE).pipe(
    tap((tastes) => {
      tastes.forEach((taste) => {
        (this.coffeeForm.get('characteristic') as FormGroup).addControl(taste.id, new FormControl(false))
      })
    })
  )

  onNoClick(): void {
    this.dialogRef.close();
  }


  onFormSubmit(form: FormGroup) {
    this._coffeeService.create({
      name: form.get('name')!.value,
      origin: form.get('origin')!.value,
      description: form.get('description')!.value,
      process: form.get('process')!.value,
      characteristic: form.get('characteristic')!.value
    }).subscribe()
  }
}

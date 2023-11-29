import { Component, Inject, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { CoffeeService } from '../../services/coffee.service';
import { CoffeeModel } from '../../models/coffee.model';
import { TasteModel } from '../../models/taste.model';
import { TASTE } from '../../utils/TASTE';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatRadioModule, MatCheckboxModule, MatInputModule, ReactiveFormsModule, CommonModule]
})
export class DialogComponent implements OnInit {
  readonly coffeeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    origin: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    process: new FormControl(''),
    characteristic: new FormGroup({})
  });

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private _coffeeService: CoffeeService, @Inject(MAT_DIALOG_DATA) public data: CoffeeModel, private _router: Router) {
  }



  readonly taste$: Observable<TasteModel[]> = of(TASTE).pipe(
    tap((tastes) => {
      tastes.forEach((taste) => {
        (this.coffeeForm.get('characteristic') as FormGroup).addControl(taste.id, new FormControl(false))
      })
    })
  )

  ngOnInit(): void {
    this.coffeeForm.patchValue(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onFormSubmit(form: FormGroup) {
    if (form.valid) {
      if (this.data) {
        this._coffeeService.update(this.data.id!, form.value
        ).subscribe(() => {
          this._router.navigate([''])
        })
      } else {
        this._coffeeService.create({
          name: form.get('name')!.value,
          origin: form.get('origin')!.value,
          description: form.get('description')!.value,
          process: form.get('process')!.value,
          characteristic: form.get('characteristic')!.value
        }).subscribe()
      }
    }
  }
}

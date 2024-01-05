import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
import { PROCESS } from 'src/app/utils/process';
import { TasteModel } from 'src/models/taste.model';
import { ProcessModel } from 'src/models/process.model';
import { CoffeeQueryModel } from 'src/models/coffee.query-model';
import { HttpClient } from '@angular/common/http';


export const TASTE: TasteModel[] = [
  {
    name: 'fruity',
    id: '1'
  },
  {
    name: 'sweet',
    id: '2'
  },
  {
    name: 'acidic',
    id: '3'
  },
  {
    name: 'floral',
    id: '4'
  },
  {
    name: 'nutty/cocoa',
    id: '5'
  },
];
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
    image: new FormControl(''),
    description: new FormControl(''),
    process: new FormControl(''),
    characteristic: new FormGroup({})
  });

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private _coffeeService: CoffeeService, @Inject(MAT_DIALOG_DATA) public data: CoffeeQueryModel, private _router: Router, private http: HttpClient) {
  }



  readonly taste$: Observable<TasteModel[]> = of(TASTE).pipe(
    tap((tastes) => {
      tastes.forEach((taste) => {
        (this.coffeeForm.get('characteristic') as FormGroup).addControl(taste.id, new FormControl(false))
      })
    })
  )

  readonly process$: Observable<ProcessModel[]> = of(PROCESS)

  ngOnInit(): void {
    this.coffeeForm.patchValue(this.data)
  }

  onFileSelected(event: any){ // change the type 
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file, file.name)
    this._coffeeService.upload(formData).subscribe()
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
          image: form.get('image')!.value,
          process: form.get('process')!.value,
          characteristic: form.get('characteristic')!.value
        }).subscribe()
      }
    }
  }
}

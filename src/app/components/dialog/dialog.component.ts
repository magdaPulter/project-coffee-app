import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { CoffeeService } from '../../services/coffee.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatRadioModule, MatCheckboxModule, MatInputModule, ReactiveFormsModule]
})
export class DialogComponent {
  readonly coffeeForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    origin: new FormControl(''),
    description: new FormControl(''),
    process: new FormControl(''),
    characteristic: new FormGroup({})
  });
  constructor(public dialogRef: MatDialogRef<DialogComponent>,  private _coffeeService: CoffeeService) { }



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

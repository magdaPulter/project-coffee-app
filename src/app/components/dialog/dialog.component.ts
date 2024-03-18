import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { CoffeeService } from '../../services/coffee.service';
import { CoffeeModel } from '../../models/coffee.model';
import { UploadFileService } from '../../services/upload-file.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
})
export class DialogComponent implements OnInit {
  date: string = new Date().toLocaleDateString();
  code: number = Math.floor(Math.random() * 10000);

  readonly coffeeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    code: new FormControl(this.code),
    category: new FormControl(),
    price: new FormControl(null, Validators.required),
    quantity: new FormControl(),
    producer: new FormControl(),
    discount: new FormControl(),
    discountToggle: new FormControl(),
    description: new FormControl(),
    longDescription: new FormControl(),
    date: new FormControl(this.date),
    unPublished: new FormControl(),
    image: new FormControl(),
  });

  readonly categories: string[] = ['Coffee', 'Accesories'];
  readonly producer: string[] = ['Coffee Roastery', 'Hario', 'Aeropress'];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private _coffeeService: CoffeeService,
    @Inject(MAT_DIALOG_DATA) public data: CoffeeModel,
    private _router: Router,
    private _uploadFileService: UploadFileService
  ) {}

  ngOnInit(): void {
    this.coffeeForm.patchValue(this.data);
  }

  onFileSelected(event: Event): void {
    this._uploadFileService.upload(event).subscribe((uploadedFile) => {
      this.coffeeForm.get('image')?.patchValue(uploadedFile.id);
    });
  }

  onFormSubmit(form: FormGroup) {
    if (form.valid) {
      if (this.data) {
        this._coffeeService.update(this.data.id!, form.value).subscribe(() => {
          this._router.navigate(['/home']);
          console.log(form);
        });
      } else {
        this._coffeeService
          .create({
            name: form.get('name')!.value,
            code: form.get('code')!.value,
            category: form.get('category')!.value,
            price: form.get('price')!.value,
            quantity: form.get('quantity')!.value,
            producer: form.get('producer')!.value,
            discount: form.get('discount')!.value,
            discountToggle: form.get('discountToggle')!.value,
            description: form.get('description')!.value,
            longDescription: form.get('longDescription')!.value,
            date: form.get('date')!.value,
            image: form.get('image')!.value,
            unPublished: form.get('unPublished')!.value,
          })
          .subscribe();
      }
    }
  }
}

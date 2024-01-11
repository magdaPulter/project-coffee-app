import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { FileModel } from '../../models/file.model';
import { CoffeeService } from '../../services/coffee.service';
import { CoffeeQueryModel } from '../../models/coffee.query-model';
import { UploadFileService } from '../../services/upload-file.service';
import { TasteModel } from '../../models/taste.model';
import { TASTE } from '../../utils/taste';
import { ProcessModel } from '../../models/process.model';
import { PROCESS } from '../../utils/process';

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
 
  readonly allFiles$: Observable<FileModel[]> = this._uploadFileService.getFile()

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private _coffeeService: CoffeeService, @Inject(MAT_DIALOG_DATA) public data: CoffeeQueryModel, private _router: Router, private _uploadFileService: UploadFileService) {
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

  onFileSelected(event: Event) : void { 
    if((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files) {
        const files = (event.target as HTMLInputElement).files as FileList
        const file = files[0]
        const formData = new FormData()
        formData.append('file', file, file.name)
        this._uploadFileService.upload(formData).subscribe((uploadedFile)=>{
          this.coffeeForm.get('image')?.patchValue(`http://localhost:3000/files/${uploadedFile.id}`)
        })  
    }
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

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { DialogDirective } from '../../directives/dialog.directive';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, DialogDirective, MatButtonModule, MatFormFieldModule, MatRadioModule, MatCheckboxModule, MatInputModule, ReactiveFormsModule]
})
export class DialogComponent {
  
  readonly coffeeForm: FormGroup = new FormGroup({ 
    name: new FormControl() 
  });

  onFormSubmit(){
    console.log(this.coffeeForm)
  }
  // constructor(@Inject(MAT_DIALOG_DATA) public data:{message:string}){}
}

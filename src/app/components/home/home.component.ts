import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import { CoffeeListComponent } from "../coffee-list/coffee-list.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatCheckboxModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, CoffeeListComponent]
})
export class HomeComponent {

constructor(private _matDialog: MatDialog) { }

openDialog() {
    const dialogRef = this._matDialog.open(
        DialogComponent, 
    )
    dialogRef
        .afterClosed()
        .subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
        });      
    }

}

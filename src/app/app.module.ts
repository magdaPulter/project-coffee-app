import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogDirective } from './directives/dialog.directive';

@NgModule({
    declarations: [
        AppComponent,    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomeComponent,
        BrowserAnimationsModule,
        DialogComponent, 
        DialogDirective
    ]
})
export class AppModule { }

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-buttons',
  standalone: true,
  imports: [CommonModule, MatButtonModule, NgClass],
  templateUrl: './login-buttons.component.html',
  styleUrls: ['./login-buttons.component.scss'],
})
export class LoginButtonsComponent {
  @Input() loginButtons!: string[];
  @Input() loginButtonSelected!: string;
  @Output() buttonSelected: EventEmitter<string> = new EventEmitter<string>();

  onButtonClicked(buttonName: string) {
    this.buttonSelected.emit(buttonName);
  }
}

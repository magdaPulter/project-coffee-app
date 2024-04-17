import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(private _router: Router) {}

  logOut() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  lang = '';
  chageLang(event: Event) {
    // console.log((event.target as HTMLInputElement).value);
    const selectedLanguage = (event.target as HTMLInputElement).value;
    localStorage.setItem('lang', selectedLanguage);
  }
}

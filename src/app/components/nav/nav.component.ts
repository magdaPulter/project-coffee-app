import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    private _router: Router,
    private translateService: TranslateService
  ) {}

  logOut() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  chageLang(event: Event) {
    const selectedLanguage = (event.target as HTMLInputElement).value;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
  }
}

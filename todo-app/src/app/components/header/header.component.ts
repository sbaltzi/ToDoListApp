import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  // logout() {
  //   localStorage.removeItem('currentUser');
  //   this.router.navigate(['/login']);
  // }
}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('logoutModal') logoutModal!: ElementRef;
  modalInstance: any;
  showUserMenu: boolean = false;
  username: string | null = '';
  isDropdownOpen: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showUserMenu = ['/to-do-list'].includes(event.url);
      }
    });
  }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    this.username = currentUser ? JSON.parse(currentUser).username : null;
  }

  openLogoutModal() {
    this.modalInstance = new bootstrap.Modal(this.logoutModal.nativeElement);
    this.modalInstance.show();
  }

  confirmLogout() {
    localStorage.removeItem('currentUser');
    this.modalInstance.hide();
    this.toggleDropdown();
    this.router.navigate(['/login']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateToHome() {
    const currentRoute = this.router.url;

    switch (currentRoute) {
      case '/to-do-list': 
      this.router.navigate(['/to-do-list']);
      break;
      case '/login':
      case '/register':
      this.router.navigate(['/login']);
      break;
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('logoutModal') logoutModal!: ElementRef;
  modalInstance: any;
  showLogout: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogout = ['/to-do-list'].includes(event.url);
      }
    });
  }

  openLogoutModal() {
      this.modalInstance = new bootstrap.Modal(this.logoutModal.nativeElement);
      this.modalInstance.show();
    }
  
    confirmLogout() {
      localStorage.removeItem('currentUser');
      this.modalInstance.hide();
      this.router.navigate(['/login']);
    }
}

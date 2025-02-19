import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('errorModal') errorModal!: ElementRef;
  private modalInstance: any; 
  email: string = '';
  password: string = '';
  invalidEmailOrPassword: boolean = false;

  constructor(private router: Router) {}

  onLogin() {
    if (!this.isFormValid()) {
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user)); // Store logged-in user
      this.router.navigate(['/to-do-list']); // Redirect to Todo List
    } else {
      this.invalidEmailOrPassword = true;
      this.showErrorModal();
    }
  }

  emailInvalid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return this.email !== '' && !emailPattern.test(this.email);
  }

  emailInvalidOrEmpty(): boolean {
    return this.emailInvalid() || this.email === '';
  }

  isFormValid(): boolean {
    return !this.emailInvalidOrEmpty() && this.password !== '';
  }

  showErrorModal() {
    this.modalInstance = new bootstrap.Modal(this.errorModal.nativeElement);
    this.modalInstance.show();
  }

  resetError() {
    this.invalidEmailOrPassword = false;
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, RouterModule, CommonModule],
})
export class RegisterComponent {
  @ViewChild('successModal') successModal!: ElementRef;
  private modalInstance: any;
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  onRegister() {
    if (!this.isFormValid()) {
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    users.push({ username: this.username, email: this.email, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));

    this.modalInstance = new bootstrap.Modal(this.successModal.nativeElement);
    this.modalInstance.show();

    setTimeout(() => {
      this.redirectToLogin();
    }, 3000); // 3000ms = 3 seconds
  }

  redirectToLogin() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.router.navigate(['/login']);
  }

  usernameInvalid(): boolean {
    return this.username !== '' && this.username.length < 3;
  }

  usernameInvalidOrEmpty(): boolean {
    return this.usernameInvalid() || this.username === '';
  }

  usernameExists(): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((u: any) => u.username === this.username);
  }

  emailInvalid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return this.email !== '' && !emailPattern.test(this.email);
  }

  emailInvalidOrEmpty(): boolean {
    return this.emailInvalid() || this.email === '';
  }

  emailExists(): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((u: any) => u.email === this.email);
  }

  passwordInvalid(): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return this.password.length > 0 && !passwordRegex.test(this.password);
  }

  passwordInvalidOrEmpty(): boolean {
    return this.passwordInvalid() || this.password === '';
  }

  confirmPasswordInvalid(): boolean {
    return this.confirmPassword !== '' && this.password !== this.confirmPassword;
  }

  confirmPasswordInvalidOrEmpty(): boolean {
    return this.confirmPasswordInvalid() || this.confirmPassword === '';
  }

  isFormValid(): boolean {
    return !this.emailInvalidOrEmpty()
      && !this.passwordInvalidOrEmpty() 
      && !this.confirmPasswordInvalidOrEmpty()
      && !this.usernameInvalidOrEmpty()
      && !this.emailExists()
      && !this.usernameExists();
  }
}

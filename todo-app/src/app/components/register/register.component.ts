import { Component } from '@angular/core';
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
  //todo: username
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      alert('All fields are required.');
      return;
    }

    if (this.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: any) => u.email === this.email)) {
      alert('User already exists!');
      return;
    }

    users.push({ email: this.email, password: this.password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    this.router.navigate(['/login']);
  }

  emailInvalid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return this.email !== '' && !emailPattern.test(this.email);
  }

  passwordInvalid(): boolean {
    return this.password !== '' && this.password.length < 8;
  }

  confirmPasswordInvalid(): boolean {
    return this.confirmPassword !== '' && this.password !== this.confirmPassword;
  }
}

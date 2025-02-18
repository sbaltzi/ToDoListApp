import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormsModule, RouterModule],
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
}

import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserCredential } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  repass: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  isUsernameInvalid(form: NgForm): boolean {
    const usernameControl = form.controls['username'];
    return !!(
      usernameControl?.invalid &&
      (usernameControl?.touched || usernameControl?.dirty)
    );
  }

  register(form: NgForm) {
    if (!form.valid) {
      return;
    }

    if (this.password !== this.repass) {
      alert('Passwords do not match');
      return;
    }

    this.authService
      .signUp(this.email, this.password, this.username)
      .then((userCredential: UserCredential) => {
        // Registration successful
        console.log('User registered:', userCredential.user);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  }
}

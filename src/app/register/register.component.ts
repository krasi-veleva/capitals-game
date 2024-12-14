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
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  isUsernameInvalid(form: NgForm): boolean {
    const usernameControl = form.controls['username'];
    return !!(
      usernameControl?.invalid &&
      (usernameControl?.touched || usernameControl?.dirty)
    );
  }

  isEmailInvalid(form: NgForm): boolean {
    const emailControl = form.controls['email'];

    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return !!(
      emailControl?.invalid &&
      (emailControl?.touched || emailControl?.dirty)
    );
  }

  isPasswordInvalid(form: NgForm): boolean {
    const passwordControl = form.controls['password'];
    return !!(
      passwordControl?.invalid &&
      (passwordControl?.touched || passwordControl?.dirty)
    );
  }

  isRepassInvalid(form: NgForm): boolean {
    const repassControl = form.controls['repass'];
    return !!(
      repassControl?.invalid &&
      (repassControl?.touched || repassControl?.dirty)
    );
  }

  passwordMismatch(form: NgForm): boolean {
    if (this.password == this.repass) {
      return false;
    }

    return true;
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
        this.errorMessage = error.message;
        console.error('Error during registration:', error);
      });
  }
}

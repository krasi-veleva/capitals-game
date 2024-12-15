import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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

  login(form: NgForm) {
    this.authService
      .signIn(this.email, this.password)
      .then(() => {
        // Login successful
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error('Error during login:', error);
      });
  }
}

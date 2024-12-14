import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
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

  @ViewChild('usernameCtrl') usernameCtrl!: NgModel;

  constructor(private authService: AuthService, private router: Router) {}

  isUsernameInvalid(): boolean {
    return (
      (this.usernameCtrl?.invalid &&
        (this.usernameCtrl?.touched || this.usernameCtrl?.dirty)) ||
      false
    );
  }

  register() {
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

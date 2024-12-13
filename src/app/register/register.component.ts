import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  repass: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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

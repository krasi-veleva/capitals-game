import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user$: Observable<User | null>;

  constructor(private router: Router, private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  goToCapitals() {
    this.router.navigate(['/capitals-game']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToStatistic() {
    this.router.navigate(['/statistic']);
  }

  async logout() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  handlePlayClick() {
    this.user$.subscribe((user) => {
      if (user) {
        this.goToCapitals();
      } else {
        this.goToLogin();
      }
    });
  }
}

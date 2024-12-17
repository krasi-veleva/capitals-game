import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = true;
  user: User | null = null;
  private authSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  handlePlayClick() {
    if (this.user) {
      this.goToCapitals();
    } else {
      this.goToLogin();
    }
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
}

import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  user: User | null = null;
  loading = true;
  errorMessage = '';

  formData = {
    profileImageUrl: '',
    description: '',
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}
  async ngOnInit() {
    const userId = this.route.snapshot.params['id'];
    try {
      const currentUser = await firstValueFrom(this.authService.user$);
      if (!currentUser || currentUser.uid !== userId) {
        this.router.navigate(['/']);
        return;
      }

      const userData = await this.firestoreService.getUser(userId);
      if (userData) {
        this.user = userData;
        this.formData = {
          profileImageUrl: userData.profileImageUrl || '',
          description: userData.description || '',
        };
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      this.errorMessage = 'Failed to load user data';
    } finally {
      this.loading = false;
    }
  }
  async handleSubmit() {
    if (!this.user) return;
    try {
      await this.firestoreService.updateUser(this.user.uid, {
        ...this.user,
        description: this.formData.description,
        profileImageUrl: this.formData.profileImageUrl,
      });

      this.router.navigate(['/statistic/details', this.user.uid]);
    } catch (error) {
      console.error('Error updating profile:', error);
      this.errorMessage = 'Failed to update profile';
    }
  }
  cancelEdit() {
    if (this.user) {
      this.router.navigate(['/statistic/details', this.user.uid]);
    }
  }
}

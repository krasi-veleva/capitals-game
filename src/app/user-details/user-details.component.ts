import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { FirestoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  defaultImage =
    'https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg';
  hasLiked = false;
  likeCount = 0;
  isCurrentUser = false;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const userId = this.route.snapshot.params['id'];

    try {
      this.user = await this.firestoreService.getUser(userId);

      const currentUser = await firstValueFrom(this.authService.user$);
      this.isCurrentUser = !!currentUser && currentUser.uid === userId;
      console.log('Current user status:', {
        isCurrentUser: this.isCurrentUser,
        profileId: userId,
        currentUserId: currentUser?.uid,
      });

      this.hasLiked = false;
      this.likeCount = 0;
    } catch (error) {
      console.error('Error loading user details:', error);
    } finally {
      this.loading = false;
    }
  }

  goToEdit() {
    if (this.user?.uid) {
      console.log('Navigating to edit profile:', this.user.uid);
      this.router.navigate(['/edit-user', this.user.uid]);
    }
  }
  async deleteProfile() {
    if (!this.isCurrentUser || !this.user) return;
    if (
      confirm(
        'Are you sure you want to delete your profile? This action cannot be undone.'
      )
    ) {
      try {
        await this.firestoreService.deleteProfile(this.user.uid);
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  }
  toggleLike() {
    this.hasLiked = !this.hasLiked;
    this.likeCount += this.hasLiked ? 1 : -1;
  }
}

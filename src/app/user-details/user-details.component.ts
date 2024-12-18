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
  likesLoading = true;
  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const userId = this.route.snapshot.params['id'];

    try {
      const [user, currentUser] = await Promise.all([
        this.firestoreService.getUser(userId),
        firstValueFrom(this.authService.user$),
      ]);

      this.user = user;
      this.currentUserId = currentUser?.uid || null;
      this.isCurrentUser = !!currentUser && currentUser.uid === userId;
      this.loading = false;

      if (this.user) {
        this.loadLikesData(userId);
      }
    } catch (error) {
      console.error('Error loading user details:', error);
      this.loading = false;
    }
  }

  private async loadLikesData(userId: string) {
    try {
      const [hasLiked, likeCount] = await Promise.all([
        this.currentUserId
          ? this.firestoreService.hasUserLikedProfile(
              this.currentUserId,
              userId
            )
          : Promise.resolve(false),
        this.firestoreService.getProfileLikesCount(userId),
      ]);
      this.hasLiked = hasLiked;
      this.likeCount = likeCount;
    } catch (error) {
      console.error('Error loading likes data:', error);
    } finally {
      this.likesLoading = false;
    }
  }

  async toggleLike() {
    if (!this.currentUserId || !this.user?.uid) {
      this.router.navigate(['/login']);
      return;
    }
    try {
      if (this.hasLiked) {
        await this.firestoreService.unlikeProfile(
          this.currentUserId,
          this.user.uid
        );
        this.likeCount--;
      } else {
        await this.firestoreService.likeProfile(
          this.currentUserId,
          this.user.uid
        );
        this.likeCount++;
      }
      this.hasLiked = !this.hasLiked;
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }

  goToEdit() {
    if (this.user?.uid) {
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
}

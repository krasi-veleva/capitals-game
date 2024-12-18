import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnInit {
  users: User[] = [];
  rowsPerPage = 5;
  currentPage = 1;
  paginatedUsers: User[] = [];
  totalPages: number = 1;

  currentUserId: string | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    // Get current user first
    const currentUser = await firstValueFrom(this.authService.user$);
    this.currentUserId = currentUser?.uid || null;
    console.log('Current user ID:', this.currentUserId); // Debug log
    await this.listAllUsers();
    this.calculatePagination();
  }

  async listAllUsers() {
    this.users = await this.firestoreService.getAllUsers();
    this.users.sort((a, b) => (b.bestScore || 0) - (a.bestScore || 0));
    // Debug log
    console.log(
      'Users:',
      this.users.map((u) => ({ uid: u.uid, username: u.username }))
    );
  }

  isCurrentUser(userId: string): boolean {
    const result = userId === this.currentUserId;
    console.log(`Comparing ${userId} with ${this.currentUserId}: ${result}`); // Debug log
    return result;
  }
  calculatePagination() {
    this.totalPages = Math.ceil(this.users.length / this.rowsPerPage);
    this.paginatedUsers = this.users.slice(
      (this.currentPage - 1) * this.rowsPerPage,
      this.currentPage * this.rowsPerPage
    );
  }

  onRowsPerPageChange(event: Event) {
    if (!event.target) {
      throw new Error('Event does not have target');
    }

    if (!(event.target instanceof HTMLSelectElement)) {
      throw new Error('Event is not fired from the select box');
    }

    this.rowsPerPage = +event.target.value;
    this.currentPage = 1;
    this.calculatePagination();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.calculatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.calculatePagination();
    }
  }
}

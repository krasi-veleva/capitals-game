import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnInit {
  users: User[] = [];
  rowsPerPage = 5;
  currentPage = 1;
  paginatedUsers: User[] = [];
  totalPages: number = 1;

  constructor(private firestoreService: FirestoreService) {}

  async ngOnInit(): Promise<void> {
    await this.listAllUsers();
    this.calculatePagination();
  }

  async listAllUsers() {
    this.users = await this.firestoreService.getAllUsers();

    console.log(this.users);
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

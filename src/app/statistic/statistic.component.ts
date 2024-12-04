import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnInit {
  users = [
    { username: 'Krasi', points: 10, details: 'Details' },
    { username: 'Alex', points: 20, details: 'Details' },
    { username: 'John', points: 15, details: 'Details' },
    { username: 'Maria', points: 25, details: 'Details' },
    { username: 'Anna', points: 30, details: 'Details' },
    { username: 'Peter', points: 18, details: 'Details' },
    { username: 'Krasi', points: 10, details: 'Details' },
    { username: 'Alex', points: 20, details: 'Details' },
    { username: 'John', points: 15, details: 'Details' },
    { username: 'Maria', points: 25, details: 'Details' },
    { username: 'Anna', points: 30, details: 'Details' },
    { username: 'Peter', points: 18, details: 'Details' },
  ];

  rowsPerPage = 5;
  currentPage = 1;
  paginatedUsers: any[] = [];
  totalPages: number = 1;

  ngOnInit(): void {
    this.calculatePagination();
  }

  calculatePagination() {
    this.totalPages = Math.ceil(this.users.length / this.rowsPerPage);
    this.paginatedUsers = this.users.slice(
      (this.currentPage - 1) * this.rowsPerPage,
      this.currentPage * this.rowsPerPage
    );
  }

  onRowsPerPageChange(event: any) {
    this.rowsPerPage = +event.target.value;
    this.currentPage = 1; // Reset to the first page
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

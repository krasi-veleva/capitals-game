import { Component, OnInit } from '@angular/core';

type UserStatistic = {
  username: string;
  points: number;
  id: string;
};

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnInit {
  users = [
    { username: 'Krasi', points: 10, id: '123412341234' },
    { username: 'Alex', points: 20, id: '123412341234' },
    { username: 'John', points: 15, id: '123412341234' },
    { username: 'Maria', points: 25, id: '123412341234' },
    { username: 'Anna', points: 30, id: '123412341234' },
    { username: 'Peter', points: 18, id: '123412341234' },
    { username: 'Krasi', points: 10, id: '123412341234' },
    { username: 'Alex', points: 20, id: '123412341234' },
    { username: 'John', points: 15, id: '123412341234' },
    { username: 'Maria', points: 25, id: '123412341234' },
    { username: 'Anna', points: 30, id: '123412341234' },
    { username: 'Peter', points: 18, id: '123412341234' },
  ];

  rowsPerPage = 5;
  currentPage = 1;
  paginatedUsers: UserStatistic[] = [];
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

  onRowsPerPageChange(event: Event) {
    if (!event.target) {
      throw new Error('Event does not have target');
    }

    if (!(event.target instanceof HTMLSelectElement)) {
      throw new Error('Event is not fired from the select box');
    }

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

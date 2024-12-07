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
    { username: 'Sofia', points: 10, id: '1' },
    { username: 'Alex', points: 20, id: '2' },
    { username: 'John', points: 15, id: '3' },
    { username: 'Maria', points: 25, id: '4' },
    { username: 'Anna', points: 30, id: '5' },
    { username: 'Peter', points: 18, id: '6' },
    { username: 'Sofia', points: 10, id: '7' },
    { username: 'Alex', points: 20, id: '8' },
    { username: 'John', points: 15, id: '9' },
    { username: 'Maria', points: 25, id: '10' },
    { username: 'Anna', points: 30, id: '11' },
    { username: 'Peter', points: 18, id: '12' },
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

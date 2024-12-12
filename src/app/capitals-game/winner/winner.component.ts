import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-winner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.css',
})
export class WinnerComponent {}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-winner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.css',
})
export class WinnerComponent {
  @Input() score: number = 0;
  @Output() playAgain = new EventEmitter<void>();
}

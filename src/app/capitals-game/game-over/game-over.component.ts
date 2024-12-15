import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css',
})
export class GameOverComponent {
  @Input() score: number = 0;
  @Output() playAgain = new EventEmitter<void>();
}

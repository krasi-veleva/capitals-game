import { Component } from '@angular/core';
import { GameOverComponent } from './game-over/game-over.component';
import { Router } from '@angular/router';
import { WinnerComponent } from './winner/winner.component';

@Component({
  selector: 'app-capitals-game',
  standalone: true,
  imports: [GameOverComponent, WinnerComponent],
  templateUrl: './capitals-game.component.html',
  styleUrl: './capitals-game.component.css',
})
export class CapitalsGameComponent {
  gameState: 'game-over' | 'winner' | 'playing' = 'playing';
  constructor(private router: Router) {}

  gameOver() {
    this.gameState = 'game-over';
  }

  winner() {
    this.gameState = 'winner';
  }
}

import { Component, OnInit } from '@angular/core';
import { GameOverComponent } from './game-over/game-over.component';
import { WinnerComponent } from './winner/winner.component';
import { Question } from '../models/question.models';

@Component({
  selector: 'app-capitals-game',
  standalone: true,
  imports: [GameOverComponent, WinnerComponent],
  templateUrl: './capitals-game.component.html',
  styleUrl: './capitals-game.component.css',
})
export class CapitalsGameComponent implements OnInit {
  questions: Question[] = [
    {
      country: 'Italy',
      correctAnswer: 'Rome',
      options: ['Rome', 'Budapest', 'Moscow', 'Madrid'],
    },
    {
      country: 'France',
      correctAnswer: 'Paris',
      options: ['Paris', 'Berlin', 'London', 'Lisbon'],
    },
    {
      country: 'Germany',
      correctAnswer: 'Berlin',
      options: ['Berlin', 'Vienna', 'Warsaw', 'Prague'],
    },
  ];

  currentQuestionIndex: number = 0;
  score: number = 0;
  gameState: 'playing' | 'game-over' | 'winner' = 'playing';
  currentQuestion: Question | null = null;
  ngOnInit() {
    this.shuffleQuestions();
    this.currentQuestion = this.questions[0];
  }
  private shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
  }
  handleAnswer(selectedAnswer: string) {
    if (selectedAnswer === this.currentQuestion?.correctAnswer) {
      this.score++;
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      } else {
        this.gameState = 'winner';
      }
    } else {
      this.gameState = 'game-over';
    }
  }

  resetGame() {
    this.shuffleQuestions();
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.currentQuestion = this.questions[0];
    this.gameState = 'playing';
  }
}

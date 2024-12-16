import { Component, OnInit } from '@angular/core';
import { GameOverComponent } from './game-over/game-over.component';
import { WinnerComponent } from './winner/winner.component';
import { Question } from '../models/question.models';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-capitals-game',
  standalone: true,
  imports: [GameOverComponent, WinnerComponent],
  templateUrl: './capitals-game.component.html',
  styleUrl: './capitals-game.component.css',
})
export class CapitalsGameComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  gameState: 'loading' | 'playing' | 'game-over' | 'winner' = 'loading';
  currentQuestion: Question | null = null;
  isAnswerSelected: boolean = false;
  selectedAnswer: string | null = null;

  constructor(private gameService: GameService) {}

  async ngOnInit() {
    await this.loadQuestions();
  }

  private async loadQuestions() {
    try {
      this.questions = await this.gameService.getQuestions();
      this.startNewGame();
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  }

  startNewGame() {
    this.questions = this.gameService.getShuffledQuestions(this.questions);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.currentQuestion = this.questions[0];
    this.gameState = 'playing';
    this.isAnswerSelected = false;
    this.selectedAnswer = null;
  }

  handleAnswer(selectedAnswer: string) {
    if (this.isAnswerSelected || !this.currentQuestion) return;

    this.isAnswerSelected = true;
    this.selectedAnswer = selectedAnswer;

    setTimeout(() => {
      if (selectedAnswer === this.currentQuestion?.correctAnswer) {
        this.handleCorrectAnswer();
      } else {
        this.handleWrongAnswer();
      }
    }, 1000);
  }

  private async handleCorrectAnswer() {
    this.score++;

    try {
      await this.gameService.updateUserScore(this.score);
    } catch (error) {
      console.error('Error updating score:', error);
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.moveToNextQuestion();
    } else {
      this.gameState = 'winner';
    }
  }

  private async handleWrongAnswer() {
    this.gameState = 'game-over';
    try {
      await this.gameService.updateUserScore(this.score);
    } catch (error) {
      console.error('Error updating score:', error);
    }
  }

  private moveToNextQuestion() {
    this.currentQuestionIndex++;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.isAnswerSelected = false;
    this.selectedAnswer = null;
  }

  async resetGame() {
    this.startNewGame();
  }
}

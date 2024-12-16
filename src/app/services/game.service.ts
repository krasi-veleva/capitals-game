import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Question } from '../models/question.models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private firestore: Firestore) {}

  async getQuestions(): Promise<Question[]> {
    const questionsCollection = collection(this.firestore, 'capitalQuestions');

    const questionSnapshot = await getDocs(questionsCollection);

    const questions = questionSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        country: data['country'],
        correctAnswer: data['correctAnswer'],
        options: this.shuffleArray([...data['options']]), // Shuffle options for each question
      };
    });
    return this.shuffleArray(questions); // Shuffle the questions order
  }
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  getShuffledQuestions(questions: Question[]): Question[] {
    return this.shuffleArray(questions);
  }
}

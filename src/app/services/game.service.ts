import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { Question } from '../models/question.models';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  async getQuestions(): Promise<Question[]> {
    const questionsCollection = collection(this.firestore, 'capitalQuestions');

    const questionSnapshot = await getDocs(questionsCollection);

    const questions = questionSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        country: data['country'],
        correctAnswer: data['correctAnswer'],
        options: this.shuffleArray([...data['options']]),
      };
    });
    return this.shuffleArray(questions);
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

  async updateUserScore(score: number): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.user$);
      if (!user) {
        console.log('No user logged in');
        return;
      }
      const userRef = doc(this.firestore, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data() as User;

      if (score > (userData.bestScore || 0)) {
        await updateDoc(userRef, {
          bestScore: score,
        });
        console.log('Score updated successfully');
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  }
}

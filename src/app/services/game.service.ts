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
    return questionSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        country: data['country'],
        correctAnswer: data['correctAnswer'],
        options: data['options'],
      };
    });
  }
}

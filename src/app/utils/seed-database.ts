import {
  addDoc,
  collection,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { Question } from '../models/question.models';

const questions: Question[] = [
  {
    country: 'France',
    correctAnswer: 'Paris',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
  },
  {
    country: 'Germany',
    correctAnswer: 'Berlin',
    options: ['Berlin', 'Vienna', 'Warsaw', 'Prague'],
  },
  {
    country: 'Italy',
    correctAnswer: 'Rome',
    options: ['Rome', 'Athens', 'Barcelona', 'Lisbon'],
  },
  {
    country: 'Spain',
    correctAnswer: 'Madrid',
    options: ['Madrid', 'Lisbon', 'Paris', 'Rome'],
  },
  {
    country: 'United Kingdom',
    correctAnswer: 'London',
    options: ['London', 'Dublin', 'Amsterdam', 'Brussels'],
  },
  {
    country: 'Portugal',
    correctAnswer: 'Lisbon',
    options: ['Lisbon', 'Madrid', 'Barcelona', 'Porto'],
  },
  {
    country: 'Greece',
    correctAnswer: 'Athens',
    options: ['Athens', 'Rome', 'Istanbul', 'Sofia'],
  },
  {
    country: 'Poland',
    correctAnswer: 'Warsaw',
    options: ['Warsaw', 'Prague', 'Budapest', 'Vienna'],
  },
  {
    country: 'Netherlands',
    correctAnswer: 'Amsterdam',
    options: ['Amsterdam', 'Brussels', 'Copenhagen', 'Berlin'],
  },
  {
    country: 'Sweden',
    correctAnswer: 'Stockholm',
    options: ['Stockholm', 'Oslo', 'Helsinki', 'Copenhagen'],
  },
];

async function doesCollectionExist(
  db: Firestore,
  collectionName: string
): Promise<boolean> {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);
  return !snapshot.empty;
}

export async function seedDatabase(db: Firestore) {
  try {
    // Check if we already have questions
    const hasQuestions = await doesCollectionExist(db, 'capitalQuestions');
    if (hasQuestions) {
      console.log('Questions already exist in the database. Skipping seed.');
      return false;
    }
    console.log('No questions found. Starting database seed...');
    // If we reach here, we need to seed the database
    const questionsCollection = collection(db, 'capitalQuestions');
    for (const question of questions) {
      await addDoc(questionsCollection, question);
      console.log(`Successfully added question for ${question.country}`);
    }
    console.log('Database seeding completed successfully!');
    return true;
  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
}

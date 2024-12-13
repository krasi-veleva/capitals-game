import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs, // Add this import
} from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  async createUser(uid: string, userData: Partial<User>) {
    const userRef = doc(this.firestore, 'users', uid);
    const defaultUser: User = {
      uid,
      username: '',
      bestScore: 0,
      description: '',
      profileImageUrl: '',
      ...userData,
    };
    await setDoc(userRef, defaultUser);
  }

  async getUser(uid: string) {
    const userRef = doc(this.firestore, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.data() as User;
  }

  async updateUser(uid: string, userData: Partial<User>) {
    const userRef = doc(this.firestore, 'users', uid);
    await updateDoc(userRef, userData);
  }

  async getAllUsers() {
    const usersRef = collection(this.firestore, 'users');
    const usersSnap = await getDocs(usersRef);
    return usersSnap.docs.map((doc) => doc.data() as User);
  }
}

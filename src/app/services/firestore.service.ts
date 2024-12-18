import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  deleteDoc,
} from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Auth, deleteUser } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore, private auth: Auth) {}

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

  async deleteProfile(authId: string) {
    const user = this.auth.currentUser;
    try {
      const docRef = doc(this.firestore, 'users', authId);
      await deleteDoc(docRef);
      console.log('user', user, user?.uid, authId);
      if (user && user.uid === authId) {
        console.log('Deleting user...');
        await deleteUser(user);
      }
    } catch (error) {
      console.error('Error deleting profile: ', error);
      throw error;
    }
  }
}

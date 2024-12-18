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
  where,
  query,
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

  async likeProfile(currentUserId: string, profileId: string) {
    const likeId = `${currentUserId}_${profileId}`;
    const likeRef = doc(this.firestore, 'likes', likeId);
    await setDoc(likeRef, { currentUserId, profileId });
  }
  async unlikeProfile(currentUserId: string, profileId: string) {
    const likeId = `${currentUserId}_${profileId}`;
    await deleteDoc(doc(this.firestore, 'likes', likeId));
  }
  async hasUserLikedProfile(
    currentUserId: string,
    profileId: string
  ): Promise<boolean> {
    const likeDoc = await getDoc(
      doc(this.firestore, 'likes', `${currentUserId}_${profileId}`)
    );
    return likeDoc.exists();
  }
  async getProfileLikesCount(profileId: string): Promise<number> {
    const q = query(
      collection(this.firestore, 'likes'),
      where('profileId', '==', profileId)
    );
    return (await getDocs(q)).size;
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

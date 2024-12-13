import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth, private firestoreService: FirestoreService) {
    this.user$ = authState(this.auth);
  }

  async signUp(email: string, password: string, username: string) {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    await this.firestoreService.createUser(credential.user.uid, {
      username,
      bestScore: 0,
      description: '',
      profileImageUrl: '',
    });
    return credential;
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return this.auth.signOut();
  }
}

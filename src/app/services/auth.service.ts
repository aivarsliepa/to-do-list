import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../interfaces/main';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  private user = new BehaviorSubject<User>(null);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.user.next({ uid: user.uid, displayName: user.displayName });
      } else {
        this.user.next(null);
      }
    });
  }

  getUser(): BehaviorSubject<User> {
    return this.user;
  }

  googleLogin(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

}

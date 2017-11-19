import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from '../interfaces/main';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
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

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then((credential: firebase.auth.UserCredential) => {
      // this.initializeUser(credential.user);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // private initializeUser(user: firebase.User) {
  //   const userDoc: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     displayName: user.displayName
  //   };
  //   userDoc.set(userData);
  // }
}

import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { User } from '../interfaces/main';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  public user: Observable<User> = Observable.of(null);

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = this.afAuth.authState.switchMap((user: firebase.User) => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then((credential: firebase.auth.UserCredential) => {
      this.initializeUser(credential.user);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  private initializeUser(user: firebase.User) {
    const userDoc: AngularFirestoreDocument<User> = this.afs.doc<User>(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      displayName: user.displayName
    };
    userDoc.set(userData);
  }
}

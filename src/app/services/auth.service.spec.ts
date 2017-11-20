import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../interfaces/main';
import { mockUser, USER_UID, USER_NAME } from '../testing/mocks';

describe('AuthService, while user is logged in', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: { authState: Observable.of(mockUser), } }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should set correct user', inject([AuthService], (service: AuthService) => {
    let result: User;
    service.getUser().subscribe(user => {
      result = user;
    }).unsubscribe();
    expect(result.displayName).toBe(USER_NAME);
    expect(result.uid).toBe(USER_UID);
  }));
});

describe('AuthService, while logged out', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: { authState: Observable.of(null) } }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('set user as null', inject([AuthService], (service: AuthService) => {
    let result = {};
    service.getUser().subscribe(user => {
      result = user;
    }).unsubscribe();
    expect(result).toBeNull();
  }));
});

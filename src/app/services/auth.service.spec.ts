import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../interfaces/main';


describe('AuthService', () => {

  const USER_UID = '1234';
  const mockUser: User = {
    uid: USER_UID,
    displayName: 'john doe'
  };

  const mockDocFunction = function (path: string) {
    if (path === `users/${USER_UID}`) {
      return {
        valueChanges: function () {
          return Observable.of(mockUser);
        }
      };
    } else {
      return null;
    }
  };

  const mockAFs: any = { doc: mockDocFunction };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: { authState: Observable.of(mockUser) } },
        { provide: AngularFirestore, useValue: mockAFs }
      ]
    });
  });

  it('should be created with logged in', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should set correct user', inject([AuthService], (service: AuthService) => {
    let result: User;
    service.user.subscribe(user => {
      result = user;
    }).unsubscribe();
    expect(result).toBe(mockUser);
  }));
});

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: { authState: Observable.of(null) } },
        { provide: AngularFirestore, useValue: {} }
      ]
    });
  });

  it('should be created with not logged in', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('set user as null, when not loggin in', inject([AuthService], (service: AuthService) => {
    let result = {};
    service.user.subscribe(user => {
      result = user;
    }).unsubscribe();
    expect(result).toBeNull();
  }));

});

import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../interfaces/main';
import {
  mockUser,
  USER_UID,
  USER_NAME,
  mockNgFireAuth,
  authStateSubject
} from '../testing/mocks';

describe('AuthService, while user is logged in', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: mockNgFireAuth }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should set correct user', inject([AuthService], (service: AuthService) => {
    authStateSubject.next(mockUser);
    let result: User;
    service.getUser().subscribe(user => {
      result = user;
    }).unsubscribe();
    expect(result.displayName).toBe(USER_NAME);
    expect(result.uid).toBe(USER_UID);
  }));

  it('set user as null', inject([AuthService], (service: AuthService) => {
    authStateSubject.next(null);
    let result = {};
    service.getUser().subscribe(user => {
      result = user;
    }).unsubscribe();
    expect(result).toBeNull();
  }));
});

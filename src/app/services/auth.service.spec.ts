import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../interfaces/main';


describe('AuthService', () => {
  beforeEach(() => {
    const mockAFA = { authState: null };
    const mockAFs = { authState: null };
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: mockAFA },
        { provide: AngularFirestore, useValue: mockAFs }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ListService } from './list.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';

describe('ListService', () => {

  // const authServiceMock = {};
  // const afsMock = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListService,
        { provide: AngularFirestore, useValue: {} },
        { provide: AuthService, useValue: {} }
      ]
    });
  });

  it('should be created', inject([ListService], (service: ListService) => {
    expect(service).toBeTruthy();
  }));
});

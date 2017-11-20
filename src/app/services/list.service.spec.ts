import { TestBed, inject } from '@angular/core/testing';
import {
  mockFireStore,
  authServiceMock,
  mockListItem1,
  mockListCollection,
  mockListItem1Doc,
  getUserSubject,
  mockUser,
  mockDocumentChangeActions,
  mockDocChangeAction1,
  mockDocChangeAction2,
  LIST_1_UID,
  LIST_2_UID
} from '../testing/mocks';
import { ListService } from './list.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { ListItem } from '../interfaces/main';

describe('ListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListService,
        { provide: AngularFirestore, useValue: mockFireStore },
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
  });

  it('should be created', inject([ListService], (service: ListService) => {
    expect(service).toBeTruthy();
  }));

  it('getList() should return no list items, when user is logged out', inject([ListService], (service: ListService) => {
    getUserSubject.next(null);
    let result;
    service.getList().subscribe(list => result = list);
    expect(result).toEqual([]);
  }));

  it('getList() should return list of all user\'s items', inject([ListService], (service: ListService) => {
    mockDocumentChangeActions.push(mockDocChangeAction1, mockDocChangeAction2);
    getUserSubject.next(mockUser);
    let result: ListItem[];
    service.getList().subscribe(list => result = list);
    expect(result[0].uid).toEqual(LIST_1_UID);
    expect(result[1].uid).toContain(LIST_2_UID);
  }));

  it('getList() should return empty list, when user has no items in list', inject([ListService], (service: ListService) => {
    mockDocumentChangeActions.length = 0;
    getUserSubject.next(mockUser);
    let result: ListItem[];
    service.getList().subscribe(list => result = list);
    expect(result).toEqual([]);
  }));

  it('addNewItem() should add correct new item to collection', inject([ListService], (service: ListService) => {
    getUserSubject.next(mockUser);
    spyOn(mockListCollection, 'add');
    service.addNewItem(mockListItem1);
    expect(mockListCollection.add).toHaveBeenCalledWith(mockListItem1);
  }));

  it('deleteItem() should add delete correct item from collection', inject([ListService], (service: ListService) => {
    getUserSubject.next(mockUser);
    spyOn(mockListItem1Doc, 'delete');
    service.deleteItem(mockListItem1);
    expect(mockListItem1Doc.delete).toHaveBeenCalled();
  }));

  it('updateItem() should update correct item', inject([ListService], (service: ListService) => {
    getUserSubject.next(mockUser);
    spyOn(mockListItem1Doc, 'update');
    service.updateItem(mockListItem1);
    expect(mockListItem1Doc.update).toHaveBeenCalledWith(mockListItem1);
  }));

});

import { TestBed, inject } from '@angular/core/testing';

import { ListService } from './list.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { ListItem } from '../interfaces/main';

describe('ListService, while user is null', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListService,
        { provide: AngularFirestore, useValue: {} },
        { provide: AuthService, useValue: { getUser: () => Observable.of(null) } }
      ]
    });
  });

  it('should be created', inject([ListService], (service: ListService) => {
    expect(service).toBeTruthy();
  }));

  it('should have no list items', inject([ListService], (service: ListService) => {
    let result;
    service.getList().subscribe(list => result = list);
    expect(result).toBeNull();
  }));

});

describe('ListService, while user is present', () => {
  const USER_UID = '1234';
  const LIST_1_UID = 'list1uid';
  const LIST_2_UID = 'list2uid';

  const mockItem2Doc = {
    delete: () => { }
  };

  const item1: ListItem = {
    date: null,
    done: false,
    title: 'list one',
    uid: LIST_1_UID
  };

  const item2: ListItem = {
    date: null,
    done: true,
    title: 'list two',
    uid: LIST_2_UID
  };

  const mockDocumentChangeActions = [
    {
      payload: {
        doc: {
          data: () => {
            return {
              date: null,
              done: false,
              title: 'list one'
            };
          },
          id: LIST_1_UID
        }
      }
    },
    {
      payload: {
        doc: {
          data: () => {
            return {
              date: null,
              done: true,
              title: 'list two'
            };
          },
          id: LIST_2_UID
        }
      }
    }
  ];

  const mockCollection = {
    snapshotChanges: () => {
      return Observable.of(mockDocumentChangeActions);
    },
    doc: (id: String) => {
      if (id === LIST_2_UID) {
        return mockItem2Doc;
      }
    },
    add: (list: ListItem) => { }
  };

  const mockDoc = {
    collection: (colPath: string) => {
      if (colPath === 'list') {
        return mockCollection;
      }
    }
  };

  const mockFireStore = {
    doc: (docPath: string) => {
      if (docPath === `users/${USER_UID}`) {
        return mockDoc;
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ListService,
        { provide: AngularFirestore, useValue: mockFireStore },
        { provide: AuthService, useValue: { getUser: () => Observable.of({ uid: USER_UID }) } }
      ]
    });
  });

  it('should be created', inject([ListService], (service: ListService) => {
    expect(service).toBeTruthy();
  }));

  it('getList() should return list of containing both items', inject([ListService], (service: ListService) => {
    let result;
    service.getList().subscribe(list => result = list);
    expect(result).toContain(item1);
    expect(result).toContain(item2);
  }));

  it('addNewItem() should add correct new item to collection', inject([ListService], (service: ListService) => {
    spyOn(mockCollection, 'add');
    service.addNewItem(item1);
    expect(mockCollection.add).toHaveBeenCalledWith(item1);
  }));

  it('deleteItem() should add delete correct item from collection', inject([ListService], (service: ListService) => {
    spyOn(mockItem2Doc, 'delete');
    service.deleteItem(item2);
    expect(mockItem2Doc.delete).toHaveBeenCalled();
  }));
});

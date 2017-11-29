import { User, ListItem } from '../interfaces/main';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const USER_UID = 'user-uid';
export const USER_NAME = 'john doe';
export const LIST_1_UID = 'list-item1-uid';
export const LIST_1_TITLE = 'list one';
export const LIST_2_UID = 'list-item2-uid';
export const LIST_2_TITLE = 'list two';
export const DATE_TIME = 'Aug 08, 1992, 11:45:00 PM';

export const mockDate1 = new Date(DATE_TIME);
export const mockUser: User = {
    uid: USER_UID,
    displayName: USER_NAME
};

export const getUserSubject = new BehaviorSubject<User>(null);
export const authServiceMock = {
    getUser: () => getUserSubject,
    logout: () => { getUserSubject.next(null); },
    googleLogin: () => { getUserSubject.next(mockUser); }
};

export const authStateSubject = new BehaviorSubject(null);
export const mockNgFireAuth = {
    authState: authStateSubject,
    auth: {
        signOut: () => { },
        signInWithPopup: () => { }
    }
};

export const getListSubject = new BehaviorSubject<ListItem[]>(null);
export const listServiceMock = {
    getList: () => getListSubject,
    updateItem: (item: ListItem) => { },
    deleteItem: (item: ListItem) => { }
};

export const mockListItem1: ListItem = {
    date: mockDate1,
    done: false,
    title: LIST_1_TITLE,
    uid: LIST_1_UID
};

export const mockListItem2: ListItem = {
    date: null,
    done: false,
    title: LIST_2_TITLE,
    uid: LIST_2_UID
};

export const mockListItem1Doc = {
    delete: () => { },
    update: (item) => { }
};

export const mockDocChangeAction1 = {
    payload: {
        doc: {
            data: () => {
                return {
                    date: mockDate1,
                    done: false,
                    title: LIST_1_TITLE
                };
            },
            id: LIST_1_UID
        }
    }
};

export const mockDocumentChangeActions = [];
export const mockListSubject = new BehaviorSubject(mockDocumentChangeActions);

export const mockListCollection = {
    snapshotChanges: () => {
        return mockListSubject;
    },
    doc: (id: String) => {
        if (id === LIST_1_UID) {
            return mockListItem1Doc;
        }
    },
    add: (list: ListItem) => { }
};

export const mockUserDoc = {
    collection: (colPath: string) => {
        if (colPath === 'list') {
            return mockListCollection;
        }
    }
};

export const mockFireStore = {
    doc: (docPath: string) => {
        if (docPath === `users/${USER_UID}`) {
            return mockUserDoc;
        }
    }
};

export const mockDocChangeAction2 = {
    payload: {
        doc: {
            data: () => {
                return {
                    date: null,
                    done: true,
                    title: LIST_2_TITLE
                };
            },
            id: LIST_2_UID
        }
    }
};
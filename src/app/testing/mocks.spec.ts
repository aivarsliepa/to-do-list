import {
    mockFireStore,
    mockUserDoc,
    USER_UID,
    mockListCollection,
    mockListSubject,
    mockListItem1Doc,
    LIST_1_UID,
    mockDocChangeAction1,
    mockDocChangeAction2,
    mockListItem1,
    mockListItem2
} from './mocks';


describe('mockFireStore', () => {
    it('doc() should return mockUserDoc, when passed users/userId as an arg', () => {
        expect(mockFireStore.doc(`users/${USER_UID}`)).toBe(mockUserDoc);
    });
    it('doc() should return undefined, when wrong user ID passed', () => {
        expect(mockFireStore.doc('users/wrong-id')).toBeUndefined();
    });
    it('doc() should return undefined, users collection is not passed with id', () => {
        expect(mockFireStore.doc(USER_UID)).toBeUndefined();
    });
});

describe('mockUserDoc', () => {
    it('collection() should return mockListCollection, when "list" string passed as an arg', () => {
        expect(mockUserDoc.collection('list')).toBe(mockListCollection);
    });
    it('collection() should return undefined, when wrong arg passed', () => {
        expect(mockUserDoc.collection('anything but list')).toBeUndefined();
    });
});

describe('mockListCollection', () => {
    it('snapshoChanges() should return mockListSubject', () => {
        expect(mockListCollection.snapshotChanges()).toBe(mockListSubject);
    });
    it('doc() should return mockListItem1Doc, when listItem1 uid passed as an arg', () => {
        expect(mockListCollection.doc(LIST_1_UID)).toBe(mockListItem1Doc);
    });
    it('doc() should return undefined, when wrong arg passed', () => {
        expect(mockListCollection.doc('anything but uid')).toBeUndefined();
    });
});

describe('mockDocChangeAction1', () => {
    it('payload.doc.data() should return mockListItem2 mocked data', () => {
        expect(mockDocChangeAction1.payload.doc.data().title).toBe(mockListItem1.title);
    });
    it('payload.doc.id should return mockListItem2 uid', () => {
        expect(mockDocChangeAction1.payload.doc.id).toBe(mockListItem1.uid);
    });
});

describe('mockDocChangeAction2', () => {
    it('payload.doc.data() should return mockListItem2 mocked data', () => {
        expect(mockDocChangeAction2.payload.doc.data().title).toBe(mockListItem2.title);
    });
    it('payload.doc.id should return mockListItem2 uid', () => {
        expect(mockDocChangeAction2.payload.doc.id).toBe(mockListItem2.uid);
    });
});

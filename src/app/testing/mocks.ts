import { User, ListItem } from '../interfaces/main';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export const USER_UID = '1234';
export const USER_NAME = 'john doe';

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

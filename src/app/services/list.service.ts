import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ListItem } from '../interfaces/main';

@Injectable()
export class ListService {

  list: Observable<ListItem[]> = Observable.of(null);

  constructor(private auth: AuthService, private afs: AngularFirestore) { }

  getList(): Observable<ListItem[]> {
    return this.auth.user.switchMap(user => {
      if (user) {
        return this.afs.doc(`users/${user.uid}`).collection('list').snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as ListItem;
            data.uid = a.payload.doc.id;
            return data;
          });
        });
      } else {
        return Observable.of(null);
      }
    });
  }
}

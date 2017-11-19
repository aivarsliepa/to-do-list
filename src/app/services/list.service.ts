import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ListItem } from '../interfaces/main';

@Injectable()
export class ListService {

  private list = new BehaviorSubject<ListItem[]>(null);
  private listCollection: AngularFirestoreCollection<ListItem>;
  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.auth.getUser().subscribe(user => {
      if (user) {
        this.listCollection = this.afs.doc(`users/${user.uid}`).collection('list');
        this.fetchList();
      }
    });
  }

  private fetchList(): void {
    this.listCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ListItem;
        data.uid = a.payload.doc.id;
        return data;
      });
    }).subscribe(list => this.list.next(list));
  }
  getList(): BehaviorSubject<ListItem[]> {
    return this.list;
  }

  addNewItem(item: ListItem) {
    this.listCollection.add(item);
  }

  deleteItem(item: ListItem) {
    this.listCollection.doc(item.uid).delete();
  }

}

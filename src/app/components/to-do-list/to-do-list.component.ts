import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  items: Observable<any[]>;

  constructor(
   // private db: AngularFirestore
  ) { }

  ngOnInit() {
    // this.items = this.db.collection('users').valueChanges();
  }

}

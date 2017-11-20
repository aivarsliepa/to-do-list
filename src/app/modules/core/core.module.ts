import { NgModule } from '@angular/core';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from '../../services/auth.service';
import { ListService } from '../../services/list.service';

@NgModule({
  imports: [
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    ListService
  ]
})
export class CoreModule { }
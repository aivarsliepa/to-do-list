import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

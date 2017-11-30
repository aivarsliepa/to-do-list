import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './interfaces/main';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
  }
}

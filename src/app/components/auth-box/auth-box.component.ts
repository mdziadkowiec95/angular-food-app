import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-auth-box',
  templateUrl: './auth-box.component.html',
  styleUrls: ['./auth-box.component.scss']
})
export class AuthBoxComponent implements OnInit {

  user$: Observable<User> = null;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
   }

  ngOnInit(): void {
  }

  signInwithGoogle(): void {
    this.auth.googleSignIn();
  }

}

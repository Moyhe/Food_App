import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute,  Router } from '@angular/router';
import  firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private route : ActivatedRoute, private _router: Router, private userService: UserService) {
     this.user$ = afAuth.authState;
  }

  login()
  {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout()
  {
    this.afAuth.signOut();
  }

  get appUser$() : Observable<AppUser | null>
  {
    return this.user$.pipe(switchMap( user => {
       if(user)  return this.userService.get(user!.uid).valueChanges();

        return of(null);
    }));

  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {

  constructor(private auth: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
     return this.auth.user$.pipe(map(user => {
         if(user) return true;

         this._router.navigate(['/login'],  { queryParams: { returnUrl: state.url }});
         return false;
     }))
  }
}

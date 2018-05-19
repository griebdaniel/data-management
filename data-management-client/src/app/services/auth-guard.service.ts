import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isLoggedIn = this.authService.isLoggedIn();
    isLoggedIn.subscribe(res => {
      if (!res) {
        this.router.navigate(['/login']);
      }
    });

    return isLoggedIn;
  }
}

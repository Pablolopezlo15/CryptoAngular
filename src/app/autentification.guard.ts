import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutentificationGuard implements CanActivate {
  constructor(private router: Router) {}

  firestore = inject(Firestore);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const auth = getAuth();
    const isLoggedIn = auth.currentUser !== null;

    if (!isLoggedIn) {
      this.router.navigate(['/iniciarSesion']);
    }

    return isLoggedIn;
  }
}
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { getAuth } from 'firebase/auth';

export const autentificationGuard: CanActivateFn = (route, state) => {
  // return isLogedIn();
  return true;
};



// const auth = getAuth();

// function isLogedIn(): boolean{
//   if (auth.currentUser) {
//     return true;
//   } else {
//     return false;
//   }
// }
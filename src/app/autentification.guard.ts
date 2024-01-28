import { CanActivateFn } from '@angular/router';

export const autentificationGuard: CanActivateFn = (route, state) => {
  console.log("Guardia");
  return true;
};

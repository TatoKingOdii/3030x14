import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {take} from "rxjs";
import {AuthFacade} from "../../facade/auth-facade/auth-facade.facade";

export const authGuard: CanActivateFn = (route, state) => {
  let loggedIn: boolean = false;

  inject(AuthFacade).getAuthStatus().pipe(take(1))
    .subscribe(value => loggedIn = value);
  if (!loggedIn) {
    inject(Router).navigateByUrl('/login');
  }
  return loggedIn;
};

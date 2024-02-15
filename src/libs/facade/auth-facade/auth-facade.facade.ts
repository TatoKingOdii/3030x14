import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {StoreService} from "../../services/store-service/store.service";
import {AuthHttpService} from "../../services/auth-http-service/auth-http.service";
import {NavService} from "../../services/nav-service/nav.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  constructor(private storeService: StoreService,
              private authHttp: AuthHttpService,
              private navService: NavService) {
    this.storeService.authenticationStatus$.next(sessionStorage.getItem('currentUser') != null);
  }

  getAuthStatus(): Observable<boolean> {
    return this.storeService.authenticationStatus$.asObservable();
  }

  authenticate(user: User, path: string, errHandler: (msg: string) => void) {
    // Validate user
    this.authHttp.getUsers()
      .subscribe(resp => {
        // Eventually come up with a nicer looking auth solution
        let idx = resp.findIndex(rsp => user.user === rsp.user && user.pass === rsp.pass);
        if (idx !== -1) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.storeService.authenticationStatus$.next(true);
          this.navService.navigate(path);
        } else {
          errHandler('Username / Password does not exist!');
        }
      });
  }

  deauthenticate() {
    sessionStorage.removeItem('currentUser');
    this.storeService.authenticationStatus$.next(false);
  }
}

import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {Endpoint, ENDPOINT_BASE, EndpointPaths} from "../../model/endpoints";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.USERS));
  }
}

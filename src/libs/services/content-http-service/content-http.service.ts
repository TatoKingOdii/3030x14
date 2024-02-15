import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Item} from "../../model/item";
import {Endpoint, ENDPOINT_BASE, EndpointPaths} from "../../model/endpoints";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentHttpService {

  constructor(private httpClient: HttpClient) { }

  loadContent(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.INVENTORY));
  }

  createContent(content: Item): Observable<any> {
    return this.httpClient.post(`${ENDPOINT_BASE}${EndpointPaths.get(Endpoint.INVENTORY)}`, content);
  }

  updateContent(content: Item): Observable<any> {
    return this.httpClient.put(`${ENDPOINT_BASE}${EndpointPaths.get(Endpoint.INVENTORY)}/${content.id}`, content)
  }

  deleteContent(content: Item): Observable<any> {
    return this.httpClient.delete(`${ENDPOINT_BASE}${EndpointPaths.get(Endpoint.INVENTORY)}/${content.id}`)
  }
}

import { Injectable } from '@angular/core';
import {StoreService} from "../../services/store-service/store.service";
import {ContentHttpService} from "../../services/content-http-service/content-http.service";
import {Item} from "../../model/item";
import {catchError, map, Observable, take} from "rxjs";
import {v4} from "uuid";
import {NavService} from "../../services/nav-service/nav.service";

@Injectable({
  providedIn: 'root'
})
export class ContentFacade {

  constructor(private storeService: StoreService,
              private contentHttp: ContentHttpService,
              private navService: NavService) {
    this.loadContent();
  }

  loadContent() {
    this.storeService.contentSubscription$ = this.contentHttp.loadContent()
      .pipe(catchError(error => {
        throw new Error('Failed to load content', error)
      }));
    this.storeService.contentSubscription$.subscribe(resp => {
      console.log('Load Content Response: ' + JSON.stringify(resp));
      this.storeService.contentList$.next(resp);
    });
  }

  addContent(addedContent: Item) {
    addedContent.id = v4();
    this.contentHttp.createContent(addedContent)
      .pipe(catchError(error => {
        throw new Error('Failed to add content', error)
      }))
      .subscribe({
        next: value => this.refreshContent(null)
      });
  }

  updateContent(contentEvent: Item) {
    this.storeService.contentList$.pipe(
      take(1),
      map(value => this.findIdxForContent(value, contentEvent)))
      .subscribe(idx => {
        // Weird quirk with the form the state of the expiration is still set
        // if it was previously and has expiration was unchecked, so clear it out here before saving
        if (!contentEvent.hasExpiration) {
          contentEvent.expirationDate = '';
        }

        if (idx !== -1) {
          this.contentHttp.updateContent(contentEvent)
            .pipe(catchError(error => {
              throw new Error('Failed to update content', error)
            }))
            .subscribe({
              next: value => this.refreshContent(null)
            });
        } else {
          this.addContent(contentEvent);
        }
      });
  }

  deleteContent(deletedContent: Item) {
    this.storeService.contentList$.pipe(
      take(1),
      map(value => this.findIdxForContent(value, deletedContent)))
      .subscribe(idx => {
        if (idx !== -1) {
          this.contentHttp.deleteContent(deletedContent)
            .pipe(catchError(error => {
              throw new Error('Failed to delete content', error)
            }))
            .subscribe({
              next: value => this.refreshContent(deletedContent.id)
            });
        }
      });
  }

  selectContentById(id: string | null) {
    this.storeService.contentSubscription$.subscribe(
      () => {
        this.storeService.contentList$.pipe(
          take(1),
          map(value => this.findContentById(value, id))
        ).subscribe(content => {
          console.log('Data At SCBI: ' + JSON.stringify(content));
          if (content) {
            this.selectContent(content);
          } else {
            this.selectContent(null);
          }
        });
      }
    );
  }

  selectContent(contentEvent: Item | null) {
    console.log('CF - Select: ' + JSON.stringify(contentEvent));
    this.storeService.selectedContent$.next(contentEvent);
  }

  goToContent(content: Item) {
    this.navService.navigateContent(content);
  }

  resetContent() {
    this.navService.navigateDashboard();
  }

  getContentList(): Observable<Item[]> {
    return this.storeService.contentList$.asObservable();
  }

  getSelectedContent(): Observable<Item | null> {
    return this.storeService.selectedContent$.asObservable();
  }

  private refreshContent(id: string | null) {
    console.log('CF - Refresh: ' + id);
    this.loadContent();

    // if id is provided we only want to clear the selected content if that has the same id
    this.storeService.selectedContent$.pipe(take(1)).subscribe(value => {
      if (!id || value?.id === id) {
        this.resetContent();
      }
    });
  }

  // Eventually move this stuff to a util?
  private findIdxForContent(content: Item[], toFind: Item) : number {
    return this.findIdxForId(content, toFind.id);
  }

  private findIdxForId(content: Item[], toFind: string) {
    return content.findIndex(content => content.id === toFind)
  }

  private findContentById(content: Item[], toFind: string | null): Item | undefined {
    return content.find(content => content.id === toFind);
  }
}

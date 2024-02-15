import { Injectable } from '@angular/core';
import {Item} from "../../model/item";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavService {
  navOpen : boolean = false;
  constructor(private router: Router) { }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  isNavOpen() : boolean {
    return this.navOpen;
  }

  closeNav() {
    this.navOpen = false;
  }

  navigateContent(contentEvent: Item) {
    console.log('Nav - Navigate: ' + JSON.stringify(contentEvent));
    this.router.navigateByUrl('dashboard/' + contentEvent.id);
  }

  navigateDashboard() {
    console.log('Nav - Reset: ');
    this.router.navigateByUrl('dashboard/');
  }

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
}

import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthFacade} from "../../libs/facade/auth-facade/auth-facade.facade";

@Component({
  selector: 'app-nav-menu-authorized',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-menu-authorized.component.html',
  styleUrl: './nav-menu-authorized.component.scss'
})
export class NavMenuAuthorizedComponent {

  constructor(public readonly authFacade: AuthFacade) {}
}

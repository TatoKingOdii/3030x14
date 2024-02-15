import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {DetailComponent} from "../detail/detail.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {UnauthorizedComponent} from "../unauthorized/unauthorized.component";
import {ActivatedRoute} from "@angular/router";
import {ContentFacade} from "../../libs/facade/content-facade/content-facade.facade";
import {AuthFacade} from "../../libs/facade/auth-facade/auth-facade.facade";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ListComponent,
    DetailComponent,
    NgIf,
    UnauthorizedComponent,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(public readonly contentFacade: ContentFacade,
              public readonly authFacade: AuthFacade,
              public readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    //Rely on the id in the route to know what content to select
    this.route.params.subscribe(params => {
      if (params) {
        let id = params['id'];
        console.log(`Dashboard OnInit SC: ${id ? id : null}`)
        this.contentFacade.selectContentById(id);
      }
    });
  }
}

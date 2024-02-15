import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {Item} from "../../model/item";
import {StoreService} from "../../services/store-service/store.service";

export const idLoadedResolver: ResolveFn<Item[]> = (route, state) => {
  return inject(StoreService).contentSubscription$;
};

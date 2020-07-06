import ShoppingBaseStore from "../ShoppingRoot/ShoppingBaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class HomeStore extends ShoppingBaseStore {
  currentUser: any;
  variations: any;
  announcements: any = [];

  constructor(spContext: WebPartContext) {
    super(spContext, "");
  }
}

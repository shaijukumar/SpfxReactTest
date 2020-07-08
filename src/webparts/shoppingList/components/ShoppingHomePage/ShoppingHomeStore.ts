import BaseStore from "../../../../Common/BaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class HomeStore extends BaseStore {
  currentUser: any;
  variations: any;
  announcements: any = [];

  constructor(spContext: WebPartContext) {
    super(spContext, "");
  }
}

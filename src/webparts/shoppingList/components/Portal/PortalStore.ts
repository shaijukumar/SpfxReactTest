import ShoppingBaseStore from "../ShoppingRoot/ShoppingBaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class Portal {
  Id: number = 0;
  Title: string = "";

  constructor(init?: Portal) {
    (Object as any).assign(this, init);
  }
}

const seletArray = ["Id", "Title"];

export default class PortalStore extends ShoppingBaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "Portal");
  }
}


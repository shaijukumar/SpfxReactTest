import ShoppingBaseStore from "../ShoppingRoot/ShoppingBaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class Category {
  Id: number = 0;
  Title: string = "";

  constructor(init?: Category) {
    (Object as any).assign(this, init);
  }
}

const seletArray = ["Id", "Title"];

export default class CategoryStore extends ShoppingBaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "Category");
  }
}

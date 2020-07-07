import ShoppingBaseStore from "../ShoppingRoot/ShoppingBaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class Product {
  Id: number = 0;
  Title: string = "";

  constructor(init?: Product) {
    (Object as any).assign(this, init);
  }
}

const seletArray = ["Id", "Title"];

export default class ProductStore extends ShoppingBaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "Product");
  }
}


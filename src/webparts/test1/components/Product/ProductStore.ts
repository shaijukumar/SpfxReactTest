import BaseStore from "../../../../Common/BaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class Product {
  Id: number = 0;
  Title: string = "";

  constructor(init?: Product) {
    (Object as any).assign(this, init);
  }
}

const seletArray = ["Id", "Title"];

export default class ProductStore extends BaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "Product");
  }
}


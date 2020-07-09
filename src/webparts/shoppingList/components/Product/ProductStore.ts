import BaseStore from "../../../../Common/BaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class Product {
  Id: number = 0;
  Title: string = "";
  CategoryId: string = "";
  QtyType: string = "";
  RequiredStock: number = 0;
  CurrentStock: number = 0;
  Shop: boolean = false;

  constructor(init?: Product) {
    (Object as any).assign(this, init);
  }
}

const seletArray = ["Id", "Title"];

export default class ProductStore extends BaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "Product");
  }

  getShoppingList = async () => {
    debugger;
    let items: Product[] = await this.getItems();

    let list: Product[] = [];
    items.forEach((item) => {
      if (item.RequiredStock > item.CurrentStock) {
        list.push(item);
      }
    });
    return list;
  };
}

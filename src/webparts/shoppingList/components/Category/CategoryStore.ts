import ShoppingBaseStore from "../ShoppingRoot/ShoppingBaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class CategoryStore extends ShoppingBaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "Category");
  }

  categories: any[] = [];

  seletArray = ["ID", "Title"];

  GeItems = async () => {
    this.categories = await this.rootGetItems(this.seletArray);
    return this.categories;
  };

  SetItem(item: any) {
    this.item = item;
  }
}

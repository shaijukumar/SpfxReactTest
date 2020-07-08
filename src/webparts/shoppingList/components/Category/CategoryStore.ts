import BaseStore from "../../../../Common/BaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class Category {
  Id: number = 0;
  Title: string = "";

  constructor(init?: Category) {
    (Object as any).assign(this, init);
  }
}

const seletArray = ["Id", "Title"];

export default class CategoryStore extends BaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "Category");
  }
}

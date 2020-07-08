import BaseStore from "../../../../Common/BaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class _ListTitle_ {
  Id: number = 0;
  Title: string = "";

  constructor(init?: _ListTitle_) {
    (Object as any).assign(this, init);
  }
}

const seletArray = ["Id", "Title"];

export default class CategoryStore extends BaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "_ListTitle_");
  }
}

import ShoppingBaseStore from "../ShoppingRoot/ShoppingBaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class Test {
  Id: number = 0;
  Title: string = "";

  constructor(init?: Test) {
    (Object as any).assign(this, init);
  }
}

const seletArray = ["Id", "Title"];

export default class TestStore extends ShoppingBaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "Test");
  }
}


import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPService } from "../../../../Common/SPService";

export default class BaseStore {
  spContext: WebPartContext;
  spService: any;
  listName: string;
  setLoading: any;
  setSubmitting: any;
  rootItems: any[] = [];

  constructor(spContext: WebPartContext, listName: string) {
    this.listName = listName;
    this.spService = SPService(this.spContext);
  }

  rootGetAllItems = async () => {
    this.rootItems = await this.spService.getAllListItems(this.listName);
    await this.Sleep();
    return this.rootItems;
  };

  rootcreateListItem = async (data: any) => {
    this.rootItems = await this.spService.createListItem(this.listName, data);
    await this.Sleep();
    return this.rootItems;
  };

  Sleep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });
  }
}

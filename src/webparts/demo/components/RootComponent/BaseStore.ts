import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPService } from "../../../../Common/SPService";

export default class PortalBaseStore {
  spContext: WebPartContext;
  siteUrl: string;
  spService: any;
  listName: string;
  setLoading: any;
  setSubmitting: any;
  rootItems: any[] = [];
  rootItem: any;

  constructor(spContext: WebPartContext, listName: string) {
    debugger;
    this.listName = listName;
    this.siteUrl = spContext.pageContext.site.absoluteUrl;
    this.spService = SPService(this.spContext, this.siteUrl);
  }

  rootGetAllItems = async () => {
    this.rootItems = await this.spService.getAllListItems(this.listName);
    await this.Sleep();
    return this.rootItems;
  };

  rootGetItemById = async (id: string) => {
    //debugger;
    this.rootItem = await this.spService.getItemById(this.listName, id);
    await this.Sleep();
    return this.rootItem;
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

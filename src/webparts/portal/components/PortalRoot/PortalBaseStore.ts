import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPService } from "../../../../Common/SPService";

export default class PortalBaseStore {
  spContext: WebPartContext;
  siteUrl: string;
  spService: any;
  listName: string;
  setLoading: any;
  setSubmitting: any;
  items: any[] = [];
  homePageItems: any[] = [];
  item: any;

  constructor(spContext: WebPartContext, listName: string) {
    //debugger;
    this.listName = listName;
    this.siteUrl = spContext.pageContext.site.absoluteUrl + "/PortalArabic";
    this.spService = SPService(this.spContext, this.siteUrl);
  }

  rootGetHomeItems = async (count?: number) => {
    this.homePageItems = await this.spService.getistItems(this.listName, count);
    return this.homePageItems;
  };

  rootGetItems = async (count?: number) => {
    if (count > 0) {
      this.items = await this.spService.getAllListItems(this.listName);
    } else {
      this.items = await this.spService.getAllListItems(this.listName);
    }

    return this.items;
  };

  rootGetAllItems = async () => {
    this.items = await this.spService.getAllListItems(this.listName);
    await this.Sleep();
    return this.items;
  };

  rootGetItemById = async (id: string) => {
    //debugger;
    this.items = await this.spService.getItemById(this.listName, id);
    await this.Sleep();
    return this.items;
  };

  rootcreateListItem = async (data: any) => {
    this.items = await this.spService.createListItem(this.listName, data);
    await this.Sleep();
    return this.items;
  };

  Sleep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });
  }
}

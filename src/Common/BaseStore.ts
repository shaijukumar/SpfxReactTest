import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPService } from "./SPService";

export class GetItemParms {
  seletArray?: any = [];
  expandCol?: any = "";
  orderByCol?: string = "Id";
  count?: number = 5000;
}

export default class BaseStore {
  spContext: WebPartContext;
  siteUrl: string;
  spService: any;
  listName: string;
  setLoading: any;
  items: any[] = [];
  item: any;

  constructor(spContext: WebPartContext, listName: string) {
    this.listName = listName;
    this.siteUrl = spContext.pageContext.site.absoluteUrl + "/shop";
    this.spService = SPService(this.spContext, this.siteUrl);
  }

  getItems = async (parrms: GetItemParms = new GetItemParms()) => {
    this.items = await this.spService.getistItems(
      this.listName,
      parrms.seletArray,
      parrms.expandCol,
      parrms.orderByCol,
      parrms.count
    );
    // await this.Sleep(3000);
    return this.items;
  };

  getItemById = async (
    id: string,
    parrms: GetItemParms = new GetItemParms()
  ) => {
    //debugger;
    this.item = await this.spService.getItemById(
      this.listName,
      id,
      parrms.seletArray,
      parrms.expandCol,
      parrms.orderByCol
    );
    //await this.Sleep();
    return this.item;
  };

  updateListItem = async (data: any) => {
    if (data.Id) {
      this.items = await this.spService.updateListItem(
        this.listName,
        data.Id,
        data
      );
    } else {
      this.item = await this.spService.createListItem(this.listName, data);
    }

    await this.Sleep();
    return this.item;
  };

  deleteListItem = async (id: number) => {
    this.item = await this.spService.deleteListItem(this.listName, id);
    //await this.Sleep();
  };

  Sleep(ms: number = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}

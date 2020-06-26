import { SPService } from "../../../../Common/SPService";
import RootStore from "../RootComponent/RootStore";
import { useContext } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import BaseStore from "../RootComponent/BaseStore";
import "core-js";

export interface ITest1 {
  Id: number;
  Title: string;
  Description: string;
}

export class Test1 {
  Id: number = 0;
  Title: string = "";
  Description: string = "";

  constructor(init?: ITest1) {
    (Object as any).assign(this, init);
  }
}

export default class TestStore extends BaseStore {
  constructor(spContext: WebPartContext, listName: string) {
    super(spContext, listName);
  }

  items: ITest1[] = [];
  item: ITest1;

  getAllItems = async () => {
    this.setLoading && this.setLoading(true);
    this.items = await this.rootGetAllItems();
    this.setLoading && this.setLoading(false);
  };

  getItemById = async (id: string) => {
    //debugger;
    this.setLoading && this.setLoading(true);
    this.item = await this.rootGetItemById(id);
    this.setLoading && this.setLoading(false);
    return this.item;
  };

  updateListItem = async (id: string, values: any) => {
    this.setSubmitting && this.setSubmitting(true);
    //this.items[0].Title = this.items[0].Title + " * ";
    await this.spService.updateListItem(this.listName, id, values);

    this.setSubmitting && this.setSubmitting(false);
  };

  deleteListItem = async (id: string) => {
    debugger;
    this.setSubmitting && this.setSubmitting(true);

    await this.spService.deleteListItem(this.listName, id);

    this.setSubmitting && this.setSubmitting(false);
  };

  createListItem = async (values: any) => {
    debugger;
    this.setSubmitting && this.setSubmitting(true);

    await this.spService.createListItem(this.listName, values);

    this.setSubmitting && this.setSubmitting(false);
  };
}

import { SPService } from "../../../../Common/SPService";
import RootStore from "../RootComponent/RootStore";
import { useContext } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import BaseStore from "../RootComponent/BaseStore";

interface ITest1 {
  Id: number;
  Title: string;
  Description: string;
}

export default class TestStore extends BaseStore {
  constructor(spContext: WebPartContext, listName: string) {
    super(spContext, listName);
  }

  items: ITest1[] = [];

  getAllItems = async () => {
    this.setLoading && this.setLoading(true);
    this.items = await this.rootGetAllItems();
    this.setLoading && this.setLoading(false);
  };

  updateListItem = async () => {
    this.setSubmitting && this.setSubmitting(true);
    this.items[0].Title = this.items[0].Title + " * ";
    await this.spService.updateListItem(this.listName, 1, this.items[0]);

    this.setSubmitting && this.setSubmitting(false);
  };

  createListItem = async () => {
    debugger;
    this.setSubmitting && this.setSubmitting(true);
    this.items[0].Title = this.items[0].Title + " * ";

    await this.spService.createListItem(this.listName, {
      Id: 0,
      Title: "Title 1",
      Description: "Description 1",
    });

    this.setSubmitting && this.setSubmitting(false);
  };
}

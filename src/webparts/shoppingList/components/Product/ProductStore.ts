import { WebPartContext } from "@microsoft/sp-webpart-base";
import ShoppingBaseStore from "../ShoppingRoot/ShoppingBaseStore";

export default class ProductStore extends ShoppingBaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "Product");
  }

  //products: any[] = [];

  seletArray = [
    "ID",
    "Title",
    "CategoryId",
    "QtyType",
    "RequiredStock",
    "CurrentStock",
  ];

  // GeItems = async () => {
  //   this.products = await this.rootGetItems(this.seletArray);
  //   return this.products;
  // };

  // SetItem(item: any) {
  //   this.item = item;
  // }

  // createListItem = async (values: any) => {
  //   debugger;
  //   await this.spService.createListItem(this.listName, values);
  // };

  //   updateListItem = async (id: string, values: any) => {
  //     this.setSubmitting && this.setSubmitting(true);
  //     await this.spService.updateListItem(this.listName, id, values);

  //     this.setSubmitting && this.setSubmitting(false);
  //   };

  //   deleteListItem = async (id: string) => {
  //     debugger;
  //     this.setSubmitting && this.setSubmitting(true);

  //     await this.spService.deleteListItem(this.listName, id);

  //     this.setSubmitting && this.setSubmitting(false);
  //   };

  //   createListItem = async (values: any) => {
  //     debugger;
  //     this.setSubmitting && this.setSubmitting(true);

  //     await this.spService.createListItem(this.listName, values);

  //     this.setSubmitting && this.setSubmitting(false);
  //   };
}

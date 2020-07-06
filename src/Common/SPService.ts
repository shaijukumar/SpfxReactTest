import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
import { constructor } from "react";
import { Web } from "@pnp/sp/webs";

export const SPService = (spContext: WebPartContext, siteUrl: string) => {
  let siteWeb;

  constructor();
  {
    siteWeb = Web(siteUrl);
    sp.setup({
      spfxContext: spContext,
    });
  }
  const currentUserDetails = async () => {
    const profile = await sp.profiles.myProperties.get();
    return profile;
  };

  const getistItems = async (
    ListName,
    seletArray = [],
    expandCol = "",
    orderByCol = "Id",
    count = 5000
  ) => {
    try {
      let items: any[] = [];
      debugger;
      items = await siteWeb.lists
        .getByTitle(ListName)
        .items.select(seletArray)
        .expand(expandCol)
        .orderBy(orderByCol)
        .top(count)
        .get();

      debugger;
      // if (count > 0) {

      //   // items = await siteWeb.lists
      //   //   .getByTitle(ListName)
      //   //   .items.select(
      //   //     "ID",
      //   //     "Title",
      //   //     "PageContent",
      //   //     "Department",
      //   //     "PageContent",
      //   //     "ArticleDate",
      //   //     "Category"
      //   //   )
      //   //   .expand("AttachmentFiles")
      //   //   .orderBy("ArticleDate")
      //   //   .top(count)
      //   //   .get();
      // } else {
      //   items = await siteWeb.lists.getByTitle(ListName).items.get();
      // }

      return items;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getAllListItems = async (ListName) => {
    //web.lists.getByTitle("My List").items.select("Title", "Description").top(5).orderBy("Modified", true).get();
    try {
      let items: any[] = [];
      items = await siteWeb.lists.getByTitle(ListName).items.get();

      return items;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getItemById = async (ListName, Id) => {
    //debugger;
    try {
      const item: any = await siteWeb.lists
        .getByTitle(ListName)
        .items.getById(Id)
        .get();

      //const item: any = await sp.web.lists.getByTitle("My List").items.getById(1).get();

      //debugger;
      return item;
    } catch (error) {
      debugger;
      console.error(error);
      return {};
    }
  };

  const updateListItem = async (ListName, itemId, data) => {
    try {
      let list = siteWeb.lists.getByTitle(ListName);
      const response = await list.items.getById(itemId).update(data);
      //debugger;
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const deleteListItem = async (ListName, itemId) => {
    debugger;
    try {
      let list = siteWeb.lists.getByTitle(ListName);
      const response = await list.items.getById(itemId).delete();
      //debugger;
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const createListItem = async (ListName, data) => {
    debugger;
    try {
      let list = siteWeb.lists.getByTitle(ListName);
      const response = await list.items.add(data);
      //const response = await list.items.getById(itemId).update(data);
      debugger;
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return {
    getistItems,
    getAllListItems,
    updateListItem,
    createListItem,
    getItemById,
    deleteListItem,
    currentUserDetails,
  };
};

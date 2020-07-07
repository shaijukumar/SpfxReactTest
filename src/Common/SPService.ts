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
    //debugger;
    try {
      let items: any[] = [];
      //debugger;
      items = await siteWeb.lists
        .getByTitle(ListName)
        .items.select(seletArray)
        .expand(expandCol)
        .orderBy(orderByCol)
        .top(count)
        .get();

      return items;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getAllListItems = async (ListName) => {
    try {
      let items: any[] = [];
      items = await siteWeb.lists.getByTitle(ListName).items.get();

      return items;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getItemById = async (
    ListName,
    Id,
    seletArray = [],
    expandCol = "",
    orderByCol = "Id"
  ) => {
    //debugger;
    try {
      const item: any = await siteWeb.lists
        .getByTitle(ListName)
        .select(seletArray)
        .expand(expandCol)
        .items.getById(Id)
        .get();
      return item;
    } catch (error) {
      //debugger;
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

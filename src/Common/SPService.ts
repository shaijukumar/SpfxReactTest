import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
import { constructor } from "react";

export const SPService = (spContext: WebPartContext) => {
  constructor();
  {
    sp.setup({
      spfxContext: spContext,
    });
  }

  const getAllListItems = async (ListName) => {
    try {
      debugger;
      const items: any[] = await sp.web.lists.getByTitle(ListName).items.get();
      return items;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const updateListItem = async (ListName, itemId, data) => {
    try {
      let list = sp.web.lists.getByTitle(ListName);
      const response = await list.items.getById(itemId).update(data);
      debugger;
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const createListItem = async (ListName, data) => {
    debugger;
    try {
      let list = sp.web.lists.getByTitle(ListName);
      const response = await list.items.add(data);
      //const response = await list.items.getById(itemId).update(data);
      debugger;
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return { getAllListItems, updateListItem, createListItem };
};

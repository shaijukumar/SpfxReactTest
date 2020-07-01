import PortalBaseStore from "../PortalRoot/PortalBaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class AnnouncementStore extends PortalBaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "AnnouncementMaster");
  }

  announcements: any[] = [];

  seletArray = [
    "ID",
    "Title",
    "PageContent",
    "Department",
    "PageContent",
    "ArticleDate",
    "Category",
    "PageContent",
  ];

  GeItems = async () => {
    this.announcements = await this.rootGetItems(
      this.seletArray,
      "AttachmentFiles",
      "ArticleDate"
    );

    return this.announcements;
  };

  GetHomeItems = async () => {
    this.homePageItems = await this.rootGetItems(
      this.seletArray,
      "AttachmentFiles",
      "ArticleDate",
      6
    );
    return this.homePageItems;
  };

  SetItem(item: any) {
    this.item = item;
  }
}

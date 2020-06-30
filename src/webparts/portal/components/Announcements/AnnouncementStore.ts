import PortalBaseStore from "../PortalRoot/PortalBaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class AnnouncementStore extends PortalBaseStore {
  constructor(spContext: WebPartContext) {
    super(spContext, "AnnouncementMaster");
  }

  GetHomeItems = async (count?: number) => {
    // var restURL =
    //   _spPageContextInfo.webAbsoluteUrl +
    //   "/_api/web/lists/getByTitle('AnnouncementMaster')/items?" +
    //   "$Select=ID,Title,PageContent,Department,PageContent,ArticleDate,Category&$Orderby=ArticleDate&$top=6&$expand=AttachmentFiles";
    // $scope.AnnouncementsData = GetHomeAnnouncements(restURL);

    this.homePageItems = await this.spService.getistItems(this.listName, count);
    return this.homePageItems;
  };
}

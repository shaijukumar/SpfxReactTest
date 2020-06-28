import PortalBaseStore from "../PortalRoot/PortalBaseStore";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class HomeStore extends PortalBaseStore {
  currentUser: any;
  variations: any;

  constructor(spContext: WebPartContext) {
    super(spContext, "");
  }

  updateHome = async () => {
    this.setLoading && this.setLoading(true);
    this.currentUser = await this.spService.currentUserDetails();
    // debugger;
    const variations = await this.spService.getAllListItems("Variation");
    this.variations = this.updateVariation(variations);
    // debugger;
    this.setLoading && this.setLoading(false);
  };

  updateVariation = async (variations) => {
    //var variation = _spPageContextInfo.webServerRelativeUrl.split("/").pop();
    var variation = "en-US";
    var titleCol = "";
    variation == "ar-ae" ? (titleCol = "Arabic") : (titleCol = "English");

    var verData = {};

    variations.forEach((v) => {
      verData[`${v["VariationGroup"]}-${v["Title"]}`] = v[titleCol];
    });

    return verData;
  };
}

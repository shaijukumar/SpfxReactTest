import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as jQuery from "jquery";

import * as strings from "PortalWebPartStrings";

import PortalRoot from "../portal/components/PortalRoot/PortalRoot";
import { IPortalRootProps } from "./components/PortalRoot/IPortalRootProps";

export interface IPortalWebPartProps {
  description: string;
}

function fixWorkbench(elem?: any, depth: number = 0) {
  //workbenchPageContent
  if (!elem && depth === 0)
    elem = document.getElementById("workbenchPageContent");
  if (!elem || depth > 20) return null;
  elem.style.padding = "0px 0px 0px 0px";
  elem.style.margin = "0px 0px 0px 0px";
  elem.style.width = "1500px";
  (Array as any)
    .from(elem.children)
    .map((child) => fixWorkbench(child, depth + 1));
}

export default class PortalWebPart extends BaseClientSideWebPart<
  IPortalWebPartProps
> {
  public onInit(): Promise<void> {
    //fixWorkbench();
    return super.onInit().then((_) => {
      // jQuery("#workbenchPageContent").prop("style", "max-width: none");
      // jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
      // jQuery(".CanvasZone").prop("style", "max-width: none");
      // setTimeout(() => {
      //   var myElement = jQuery(
      //     'button[data-automation-id="workbench-command-bar-preview"]'
      //   ).click();
      //   jQuery(".dragIconContainer_90be1210").prop(
      //     "style",
      //     "visibility: hidden"
      //   );
      // }, 200);
    });
  }

  public render(): void {
    const element: React.ReactElement<IPortalRootProps> = React.createElement(
      PortalRoot,
      {
        description: this.properties.description,
        spContext: this.context,
      }

      // Portal,
      // {
      //   description: this.properties.description,
      // }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}

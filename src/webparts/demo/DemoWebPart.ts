import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "DemoWebPartStrings";
import RootComponent from "./components/RootComponent/RootComponent";
import { IRootComponentProps } from "../demo/components/RootComponent/IRootComponentProps";

export interface IDemoWebPartProps {
  description: string;
}

export default class DemoWebPart extends BaseClientSideWebPart<
  IDemoWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IRootComponentProps> = React.createElement(
      RootComponent,
      {
        description: this.properties.description,
        spContext: this.context,
      }
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

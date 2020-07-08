import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "Test1WebPartStrings";
import Test1 from "./components/Test1";
import { ITest1Props } from "./components/ITest1Props";

import TestOneRoot from "./components/TestOneRoot/TestOneRoot";

import { IRootProps } from "../../Common/IRootProps";

export interface ITest1WebPartProps {
  description: string;
}

export default class Test1WebPart extends BaseClientSideWebPart<
  ITest1WebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IRootProps> = React.createElement(
      TestOneRoot,
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

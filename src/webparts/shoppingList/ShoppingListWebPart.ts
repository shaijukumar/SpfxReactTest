import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "ShoppingListWebPartStrings";

import { IShoppingRootProps } from "./components/ShoppingRoot/IShoppingRootProps";
import ShoppingRoot from "./components/ShoppingRoot/ShoppingRoot";

export interface IShoppingListWebPartProps {
  description: string;
}

export default class ShoppingListWebPart extends BaseClientSideWebPart<
  IShoppingListWebPartProps
> {
  public render(): void {
    // const element: React.ReactElement<IShoppingListProps> = React.createElement(
    //   ShoppingList,
    //   {
    //     description: this.properties.description
    //   }
    // );
    const element: React.ReactElement<IShoppingRootProps> = React.createElement(
      ShoppingRoot,
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

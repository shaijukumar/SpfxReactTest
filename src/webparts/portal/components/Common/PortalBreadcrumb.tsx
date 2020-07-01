import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import PortalRootStore from "../PortalRoot/PortalRootStore";

export interface BreadcrumbPath {
  Title: string;
  Path?: string;
}

const PortalBreadcrumb: React.FC<{ pathList?: BreadcrumbPath[] }> = ({
  pathList = [],
}) => {
  const { homeStore } = useContext(PortalRootStore);

  return (
    <div className="breadcrumbWrapper">
      {pathList.length == 0 ? (
        <Link to="/" className="breadcrumb">
          {homeStore.variations["General-Home"]
            ? homeStore.variations["General-Home"]
            : "Home"}
        </Link>
      ) : (
        pathList.map((path) =>
          path.Path ? (
            <Link to={`${path.Path}`} className="breadcrumb">
              {homeStore.variations[path.Title]
                ? homeStore.variations[path.Title]
                : path.Title}{" "}
            </Link>
          ) : (
            <span className="breadcrumb">
              {homeStore.variations[path.Title]}
            </span>
          )
        )
      )}
    </div>
  );
};

export default PortalBreadcrumb;

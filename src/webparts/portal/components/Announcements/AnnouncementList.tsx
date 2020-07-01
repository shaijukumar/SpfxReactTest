import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Slider from "react-slick";
import * as moment from "moment";

import PortalRootStore from "../PortalRoot/PortalRootStore";
import Screen from "../PortalRoot/Screen";
import PortalBreadcrumb from "../Common/PortalBreadcrumb";

export interface IListItemsProps {}

const AnnouncementList: React.FC<IListItemsProps> = (props) => {
  const { homeStore } = useContext(PortalRootStore);

  return (
    <Screen loading={false}>
      <PortalBreadcrumb
        pathList={[
          { Title: "Announcements-Home", Path: "/" },
          { Title: "Announcements-Announcements", Path: "" },
        ]}
      />

      <div className="card announcements icons slider">AnnouncementList</div>
    </Screen>
  );
};

export default AnnouncementList;

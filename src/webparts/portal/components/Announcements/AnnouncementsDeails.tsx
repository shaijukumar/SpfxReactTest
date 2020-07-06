import * as React from "react";
import { useContext, useState, useEffect } from "react";
import * as moment from "moment";

import PortalRootStore from "../PortalRoot/PortalRootStore";
import Screen from "../PortalRoot/Screen";
import PortalBreadcrumb from "../Common/PortalBreadcrumb";

export interface IListItemsProps {}

const AnnouncementsDeails: React.FC<IListItemsProps> = (props) => {
  const { homeStore, announcementStore } = useContext(PortalRootStore);
  const ann = announcementStore.item;
  const v = homeStore.variations;

  return (
    <Screen loading={false}>
      <PortalBreadcrumb
        pathList={[
          { Title: "Announcements-Home", Path: "/" },
          { Title: "Announcements-Announcements", Path: "/Announcements" },
          { Title: "Announcements-Details", Path: "" },
        ]}
      />
      <h1 className="h1">
        {homeStore.variations["Announcements-Announcements"]}
      </h1>
      <div className="divider"></div>

      {/* <div className="card">Announcements Deails12 -> {item.Title}</div> */}

      <div className="detailView">
        <div className="card">
          <div className="card-content">
            {/* Announcements Details */}
            <div className="row">
              <div className="col s12">
                <h3>{ann.Title}</h3>
                <p>
                  <span className="badgeTag {X.Department}">
                    <span></span>
                    {ann.Department}
                  </span>
                  &nbsp;|&nbsp;
                  <span className="date">
                    {moment(ann.ArticleDate).format("MM-DD-YYYY")}
                  </span>
                </p>
                <div className="center-align">
                  <img src={ann.AttachmentFiles[0].ServerRelativeUrl} />
                </div>
                <p>{ann.PageContent}</p>
              </div>
            </div>
            {/* Enf of Announcements Details */}
            {/* More Announcements */}
            <div className="row">
              <h5 className="col s12">{v["Announcements-More"]}</h5>
              <div>
                {homeStore.announcements.slice(0, 4).map((a) => (
                  <div className="col s12 m3">{a.Title}</div>
                ))}
              </div>

              {/* <div
              className="col s12 m3"
              ng-repeat="x in announcementsData | orderBy:['-ArticleStartDate ','-ID']   | limitTo:4"
            >
              <div>
                <a href="#!/AnnouncementsDetails/{{x.ID}}" class="image">
                  <div
                    style="background: url({{x.PublishingPageImage}});"
                  ></div>
                </a>
              </div>

              <div>
                <a href="#!/AnnouncementsDetails/{{x.ID}}"
                  ><span v="card-title dtailed"
                    >{{x.ArticleByLine | limitTo:97 }}{{x.ArticleByLine.length >
                    97 ? '...' : ''}}</span
                  ></a
                >
                <!--<p>{{x.PublishingPageContent  | limitTo:200 }}{{x.PublishingPageContent.length > 200 ? '...' : ''}}</p>-->
                <span className="badgeTag {{X.Department}}"
                  ><span></span>{{x.Department}}</span
                >&nbsp;|&nbsp;<span v="date"
                  >{{x.ArticleStartDate | date:"dd/MM/yyyy"}}</span
                >
              </div>

            </div> */}
            </div>
            {/* End of Announcements*/}
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default AnnouncementsDeails;

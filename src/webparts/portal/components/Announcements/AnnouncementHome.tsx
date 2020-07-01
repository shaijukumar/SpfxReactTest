import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import * as moment from "moment";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PortalRootStore from "../PortalRoot/PortalRootStore";

export interface IListItemsProps {}

const AnnouncementHome: React.FC<IListItemsProps> = (props) => {
  const { homeStore, announcementStore } = useContext(PortalRootStore);

  let history = useHistory();
  const [todayWeek, setTodayWeek] = useState("Day");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="card announcements icons slider">
      <Slider {...settings}>
        {homeStore.announcements.map((ann) => (
          <div className="row">
            <div className="col m4" style={{ height: "100px" }}>
              {ann.AttachmentFiles.length > 0 && (
                <img
                  className="image"
                  src={ann.AttachmentFiles[0].ServerRelativeUrl}
                />
              )}
            </div>

            <div className="col m8" style={{ height: "100px" }}>
              <span className="icon icon-latestAnnouncements"></span>
              <span>{homeStore.variations["Home-Announcements"]}</span>eee11
              <div className="caption left-align">
                <h2 className="right-align">
                  <a
                    href="#"
                    onClick={() => {
                      announcementStore.SetItem(ann);
                      history.push(`/Announcement`);
                    }}
                  >
                    {ann.Title.length < 120
                      ? ann.Title
                      : ann.Title.substr(0, 120) + "..."}
                  </a>
                </h2>
                <p className="right-align">
                  <span className="siteDepartment">
                    <span
                      className="badgeTag"
                      // ng-class="{'GeneralTag':  (GeneralSettings.DefaultDept === x.Department || !x.Department )}"
                    >
                      {ann.Department
                        ? ann.Department
                        : homeStore.variations["General-DefaultDept"]}
                    </span>
                    &nbsp;|
                  </span>
                  <span className="date">
                    {moment(ann.ArticleDate).format("MM-DD-YYYY")}

                    {/* {{x.ArticleStartDate | date: "dd/MM/yyyy"}} */}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AnnouncementHome;

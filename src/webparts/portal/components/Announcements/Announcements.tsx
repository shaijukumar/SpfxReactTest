import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PortalRootStore from "../PortalRoot/PortalRootStore";

export interface IListItemsProps {}

const Announcements: React.FC<IListItemsProps> = (props) => {
  const { homeStore } = useContext(PortalRootStore);

  const [todayWeek, setTodayWeek] = useState("Day");

  // useEffect(() => {
  //   if (homeStore.variations && homeStore.currentUser) {
  //     const v = homeStore.variations;
  //     try {
  //     } catch (err) {}
  //   }
  // }, [homeStore.currentUser, homeStore.variations]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="card announcements icons slider" id="AnnouncementsCarousel">
      <Slider {...settings} >
        {homeStore.announcements.map((ann) => (
          <div className="row">
            <div className="col m4">
              {ann.AttachmentFiles.length > 0 && (
                <img
                  src={ann.AttachmentFiles[0].ServerRelativeUrl}
                  className="announcementImage"
                />
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>

    // <div className="card announcements icons slider" id="AnnouncementsCarousel">
    //   <ul className="slides"></ul>
    // </div>
  );
};

export default Announcements;

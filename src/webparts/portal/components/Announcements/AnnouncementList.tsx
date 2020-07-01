import * as React from "react";
import { useContext, useState, useEffect } from "react";
import Slider from "react-slick";
import * as moment from "moment";


import PortalRootStore from "../PortalRoot/PortalRootStore";

export interface IListItemsProps { }

const AnnouncementList: React.FC<IListItemsProps> = (props) => {
    const { homeStore } = useContext(PortalRootStore);

    return (
        <div className="card announcements icons slider">
            AnnouncementList
        </div>
    );
};

export default AnnouncementList;

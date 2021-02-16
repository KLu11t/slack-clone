import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import SidebarOption from "./SidebarOption";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddBox from "@material-ui/icons/AddBox";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [DMs, setDMs] = useState([]);
    const [{ user }] = useStateValue();
    useEffect(() => {
      db.collection("rooms").onSnapshot(snapshot => 
      setChannels(
         snapshot.docs.map((doc) => ({
           id: doc.id,
           name: doc.data().name,
         }))
       )
      );

      db.collection("DirectM").onSnapshot(snapshot => 
        setDMs(
           snapshot.docs.map((doc) => ({
             id: doc.id,
             UserName: doc.data().UserName,
           }))
         )
        );

    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>Portfolio</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user?.displayName}
                    </h3>
                </div>
             <CreateIcon />
             </div>
             <SidebarOption Icon={ExpandMoreIcon} title="チャンネル" /> 
             <div className="sidebar__containts">
                {channels.map((channel) => (
                  <SidebarOption title={channel.name} id={channel.id} ChOrUsFlag={1}/>
                ))}      
                <SidebarOption Icon={AddBox} title="チャンネルを追加" addChannelOption ChOrUsFlag={1}/>
              </div>
                <SidebarOption Icon={ExpandMoreIcon} title="ダイレクトメッセージ" /> 
                <div className="sidebar__containts">
                {DMs.map((DM) => (
                  <SidebarOption username={DM.UserName} id={DM.id} ChOrUsFlag={0}/>
                ))}      
             <SidebarOption Icon={AddBox} title="メンバーを追加" addDMuserop ChOrUsFlag={0}/>
             </div>
        </div>
    );
}

export default Sidebar;

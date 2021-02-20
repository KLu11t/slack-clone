import React from 'react'
import "./SidebarOption.css";
import { useHistory } from "react-router-dom";
import db from "./firebase";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useStateValue } from "./StateProvider";


function SidebarOption({ Icon, title, id, addChannelOption, username, addDMuserop, ChOrUsFlag }) {
    const history = useHistory();
    const [{ user }] = useStateValue();

    const selectChannel = () => {
        if (id) {
            history.push(`/room/${id}`);
        }else{
            history.push(`title`);
        }
    };
    const selectUser = () => {
      if (id) {
          history.push(`/room/${id}`);
      }else{
          history.push(`username`);
      }
  };

    const addChannel = () => {
        const channelName = prompt('Please enter the channel name');
      
        if (channelName) {
            db.collection('rooms').add({
                name: channelName,
            })
        }
    };

    const addDMuser = () => {
      const DMusername = prompt('Please enter the mailadress of the user');
      var UniqID = "";
      {user.email > DMusername 
        ? (UniqID = user.email + "-" + DMusername) 
        : (UniqID = DMusername + "-" + user.email)}
      if (DMusername) {
          db.collection('DirectM').add({
              UserName1: DMusername,
              UserName2: user.email,
              DMid: UniqID,
          })
      }
  };

    return (


      <div className="sidebarOption"
      onClick={(() => {
        if (ChOrUsFlag == 1) {
          if(addChannelOption){
  return addChannel
  }
  else{
  return selectChannel
  }
        } else if(ChOrUsFlag == 0){
          if(addDMuserop){
  return addDMuser
  }
  else{
  return selectUser
  }
        }
      })()}>

      {Icon && <Icon className="sidebarOption__icon" />}
      
      {(() => {
          if (Icon) {
            return <h3>{title}</h3>
          } else {
            if (!username) { 
            return <h3 className="sidebarOption__channel">
            <span className="sidebarOption__hash">#</span>{title}</h3>
            } else {
            return <h3 className="sidebarOption__username">
              <span className="sidebarOptionDM"><FiberManualRecordIcon /></span>{username}</h3>
            }
          }
        })()}

              {/*
    <div
      className="sidebarOption"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      */}

{/*
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span>{title}
        </h3>
      )}
      */}


    </div>
  );
}

export default SidebarOption;

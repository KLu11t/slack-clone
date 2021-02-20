import React from 'react';
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import db from "./firebase";
import { useState, useEffect, useRef, } from "react";
import Message from './Message';
import ChatInput from './ChatInput.js';
import { useStateValue } from "./StateProvider";

function Chat() {
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [DMroomDetails, setDMroomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);
    const [DMroomMessages, setDMRoomMessages] = useState([]);
    const [{ user }] = useStateValue();

    useEffect(() => {

      if (roomId) {
        db.collection('rooms')
        .doc(roomId)
        .onSnapshot(snapshot => setRoomDetails(snapshot.data()
        ))
        db.collection('DirectM')
      .doc(roomId)
      .onSnapshot(snapshot => setDMroomDetails(snapshot.data()
      ))
    }

    db.collection('rooms')
    .doc(roomId)
    .collection('messages')
    .orderBy('timestamp','asc')
    .onSnapshot((snapshot) =>
      setRoomMessages(snapshot.docs.map(doc => doc.data()))
      );
      db.collection('DirectM')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp','asc')
      .onSnapshot((snapshot) =>
        setDMRoomMessages(snapshot.docs.map(doc => doc.data()))
        );
  }, [roomId]);

    return (
      <div className="chat">

      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">          
            {(() => {    
              if(roomDetails?.name){
                return <strong>#{roomDetails?.name}</strong>
              }else if(DMroomDetails?.DMid){
                if(DMroomDetails?.UserName1 == user.email){
                  return <strong>#{DMroomDetails?.UserName2}</strong>
                }else {
                  return <strong>#{DMroomDetails?.UserName1}</strong>
                }
              }
            })()}
            <StarBorderOutlinedIcon />
          </h4>
          トピックを追加
          </div>   
            <div className="chat__headerRight">
              <p>
                <PersonAddIcon />
                <InfoOutlinedIcon />
              </p>
            </div>
            </div>
  
            <div className="chat__field" >
            
          <div className="chat__messages" >
          
            {roomMessages.map(({message, timestamp, user, userImage}) => {
              if(roomDetails){
                return <Message message={message} timestamp={timestamp} user={user} userImage={userImage}/>
                }
            })}
            
            {DMroomMessages.map(({message, timestamp, user, userImage}) => {
              if(DMroomDetails){
              return <Message message={message} timestamp={timestamp} user={user} userImage={userImage}/>
              }
            })}
            
          </div>
          
         </div>

        <div className="chat__bottom">
        <ChatInput channelName={roomDetails?.name} DMchannelName=
{(() => {   
if(DMroomDetails?.UserName1 == user.email){
  return DMroomDetails?.UserName2
}else {
  return DMroomDetails?.UserName1
}
})()}
         channelId={roomId} />
        </div>

      </div>
      
    );
}

export default Chat;

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


function Chat() {
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);
    let resultsRef = useRef();

    useEffect(() => {
      resultsRef.current.scrollTop = 50;

      if (roomId) {
        db.collection('rooms')
        .doc(roomId)
        .onSnapshot(snapshot => setRoomDetails(snapshot.data()
        ))
    }

    db.collection('rooms')
    .doc(roomId)
    .collection('messages')
    .orderBy('timestamp','asc')
    .onSnapshot((snapshot) =>
      setRoomMessages(snapshot.docs.map(doc => doc.data()))
      );
  }, [roomId]);

    return (
      <div className="chat">

      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
              <strong>#{roomDetails?.name}</strong>
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
            
          <div className="chat__messages" ref={resultsRef}>
          
            {roomMessages.map(({message, timestamp, user, userImage}) => (
              <Message
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
              />
            ))}
          </div>
          
         </div>

        <div className="chat__bottom">
        <ChatInput channelName={roomDetails?.name} channelId={roomId} />
        </div>

      </div>
      
    );
}

export default Chat;

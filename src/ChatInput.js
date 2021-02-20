
import React, { useState } from "react";
import db from "./firebase";
import './ChatInput.css';
import { useStateValue } from "./StateProvider";
import firebase from "firebase";

function ChatInput({channelName, DMchannelName, channelId }) {
    const [input, setInput]=useState('');
    const [{ user }] = useStateValue();

const sendMessage = e => {
    e.preventDefault();

    if(channelId && channelName){
        db.collection("rooms").doc(channelId).collection("messages").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
          });
}else if(channelId && DMchannelName){
    db.collection("DirectM").doc(channelId).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
}
setInput("");
  };
    return (
        <div className ="chatInput">
            <form>
                <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message #${channelName ? (channelName?.toLowerCase()) : (DMchannelName?.toLowerCase())}`}/>
                <button type="submit" onClick={sendMessage}>
                    SEND
                    </button>
            </form>
        </div>
    );
}

export default ChatInput;

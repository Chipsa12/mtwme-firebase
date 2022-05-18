import TimeAgo from 'timeago-react';
import { useSelector } from "react-redux";

import "./Message.css";

const Message = ({ message, own, userId }) => {
  const {users} = useSelector(state => state.user)
  const currentUser = users[userId]
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={currentUser.avatar}
          alt="avatar"
        />
        <div className="messageText">{message.text}</div>
      </div>
      <div className="messageBottom">
        <TimeAgo datetime={message.created_at}/>
      </div>
    </div>
  );
}

export default Message;
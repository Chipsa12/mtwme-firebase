import Conversation from "../Conversation/Conversation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../actions/conversation"
import { getMessages } from "../../actions/messenger"

import "./Messenger.css";

const Messenger = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getConversations())
    dispatch(getMessages())
  },[dispatch])
  
  const { currentUser } = useSelector(state => state.user);
  const conversations = useSelector(state => state.conversation.conversations)
  // const [search, setSearch] = useState('');
  const currentConversations = conversations.filter(
    conversation => 
      (conversation.members[0] === currentUser.id || conversation.members[1] === currentUser.id)
  )
  
  return (
      <div className="messenger">
        {/* <input value={search} className="chatSearch" type="text" placeholder="Поиск..." onChange={(e) => setSearch(e.target.value)}/> */}
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {
              currentConversations.length
              ?
              currentConversations.map((c) => (
                <div key={c.id}>
                  <Conversation conversation={c} currentUser={currentUser}/>
                </div>
              ))
              : <span className="notConversation">У вас пока нет диалогов</span>
            }
          </div>
        </div>  
      </div>
  );
}

export default Messenger;
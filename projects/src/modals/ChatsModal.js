import { React, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./ChatsModal.scss";
import { getAllUsers } from "../utility/getAllUsers";
import { useAuthContext } from "../context/AuthContext";

const ChatsModal = ({ modalHandlier, setChat, activeChatId, userChats }) => {
  const [search, setSearch] = useState("");
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount

  const createChat = async (users) => {
    const responce = await fetch("http://localhost:5000/chats", {
      method: "POST",
      body: JSON.stringify({ users: [...users, user.username] }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await responce.json();
    if (data) {
      modalHandlier(false);
    }
  };
  console.log(userChats);
  return (
    <div className="chats-modal">
      <div className="modal" onClick={() => modalHandlier(false)}>
        <div className="modal-sandbox"></div>
        <div className="modal-box">
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <header>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </header>
            <ul className="chats-list">
              {userChats
                .filter((chat) => chat.members[0].username.includes(search))
                .map((chat) => (
                  <li
                    onClick={() => {
                      setChat(chat);
                      modalHandlier(false);
                    }}
                    className={activeChatId === chat.id && `active-chat-item`}
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/men/1.jpg`}
                      alt=""
                    />
                    <div className="chat-info">
                      <div className="user-name">
                        {chat.members[0].username}
                      </div>
                      <div className="message">Last message here...</div>
                    </div>
                  </li>
                ))}
            </ul>
            {true ? (
              <div className="global-search-indicator">People you may know</div>
            ) : null}
            <ul className="chats-list">
              {users
                .filter(
                  (userFilter) =>
                    userFilter.username !== user.username &&
                    !userChats.some(
                      (chat) => chat.members[0].username === userFilter.username
                    ) &&
                    userFilter.username.includes(search)
                )
                .map((userIterator) => (
                  <li
                    className=""
                    onClick={() => {
                      createChat([userIterator.username]);
                    }}
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/men/1.jpg`}
                      alt=""
                    />
                    <div className="chat-info">
                      <div className="user-name">{userIterator.username}</div>
                      <div className="message"></div>
                    </div>
                  </li>
                ))}
            </ul>
            {search.length > 0 ? (
              <div className="global-search-indicator">
                Global search results
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsModal;

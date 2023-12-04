import React from "react";
import "./RightSidebar.scss";

const RightSidebar = () => {
  return (
    <nav className="nav-rightsidebar">
      <div className="title">
        <span>all users</span>
      </div>
      <div className="hr-wrapper">
        <hr />
      </div>
        <ul className="users-wrapper">
          <li><span>user1</span><img src="https://randomuser.me/api/portraits/men/11.jpg" alt="" /></li>
          <li><span>user2</span><img src="https://randomuser.me/api/portraits/men/12.jpg" alt="" /></li>
          <li><span>user3</span><img src="https://randomuser.me/api/portraits/women/13.jpg" alt="" /></li>
          <li><span>user4</span><img src="https://randomuser.me/api/portraits/men/14.jpg" alt="" /></li>
          <li><span>user5</span><img src="https://randomuser.me/api/portraits/women/15.jpg" alt="" /></li>
          <li><span>user1</span><img src="https://randomuser.me/api/portraits/men/11.jpg" alt="" /></li>
          <li><span>user2</span><img src="https://randomuser.me/api/portraits/men/12.jpg" alt="" /></li>
          <li><span>user3</span><img src="https://randomuser.me/api/portraits/women/13.jpg" alt="" /></li>
          <li><span>user4</span><img src="https://randomuser.me/api/portraits/men/14.jpg" alt="" /></li>
          <li><span>user5</span><img src="https://randomuser.me/api/portraits/women/15.jpg" alt="" /></li>
          <li><span>user1</span><img src="https://randomuser.me/api/portraits/men/11.jpg" alt="" /></li>
          <li><span>user2</span><img src="https://randomuser.me/api/portraits/men/12.jpg" alt="" /></li>
          <li><span>user3</span><img src="https://randomuser.me/api/portraits/women/13.jpg" alt="" /></li>
          <li><span>user4</span><img src="https://randomuser.me/api/portraits/men/14.jpg" alt="" /></li>
          <li><span>user5</span><img src="https://randomuser.me/api/portraits/women/15.jpg" alt="" /></li>
        </ul>
    </nav>
  );
};

export default RightSidebar;

import logo from "./logo.svg";
import "./App.css";
import Chat from "./Chat";
import * as Icon from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useCallback } from "react";

import {
  Button,
  Badge,
  Popover,
  OverlayTrigger,
  ListGroup,
} from "react-bootstrap";

function App2() {
  //var notificationList = [];
  //const const [state, setstate] = useState(initialState)
  const [notificationList, setnotificationList] = useState([]);
  const [notificationCount, setnotificationCount] = useState(0);
  // useEffect(() => {
  //   setnotificationList([2, 3]); // this will fire on every change :(
  // }, "");
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Title as='h3'>Notifications</Popover.Title>
      <Popover.Content>
        <ListGroup>
          {notificationList.map((l) => (
            <ListGroup.Item key={l}>
              Download report{" "}
              <a href='#'>
                {l}
                <Icon.Download></Icon.Download>{" "}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Popover.Content>
    </Popover>
  );
  // function onReceiveNotification(result) {
  //   //  var notificationListtemp = [...notificationList, result];
  //   const list = notificationList.concat(result);
  //   //notificationListtemp.push(result);
  //   setnotificationList(list);
  // }
  const onReceiveNotification = useCallback((result) => {
    //const list = notificationList.concat(result);
    //notificationListtemp.push(result);
    setnotificationList((list) => list.concat(result));
    setnotificationCount((count) => parseInt(count) + 1);
  }, null);
  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ float: "right", width: "100%" }}>
          <img src={logo} className='App-logo' alt='logo' />
        </div>

        {/* <a
          // style={{ width: "80%" }}
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        ></a> */}
        <div style={{ float: "left", width: "150px" }}>
          <OverlayTrigger
            trigger='click'
            placement='bottom-end'
            overlay={popover}
          >
            <div className='notification'>
              <Icon.Bell color='white'></Icon.Bell>
              <span class='badge'>
                {parseInt(notificationCount) == 0 ? "" : notificationCount}
              </span>
            </div>
          </OverlayTrigger>
        </div>
      </header>
      <div>
        <Chat receiveNotification={onReceiveNotification} />
      </div>
    </div>
  );
}

export default App2;

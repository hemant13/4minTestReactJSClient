// import logo from "./logo.svg";
import "./App.css";

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
import PrimarySearchAppBar from "./Header/PrimarySearchAppBar";
import Chat from "./Chat";

function App() {
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
          {notificationList.length &&
            notificationList.map((l) => (
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
  const onReceiveNotification = useCallback((result, requestId) => {
    setnotificationList(
      (tempList) => {
        tempList.forEach((element) => {
          if (parseInt(element.listId) === parseInt(requestId)) {
            element.status = 1;
            element.result = result;
          }
        });
        return [...tempList];
      }
    );

    setnotificationCount((count) => parseInt(count) + 1);
    console.log(notificationList);
  }, []);
  const onNotificationOpen = useCallback(() => {
    setnotificationCount((count) => 0);
  }, null);
  const onClearNotification = useCallback((clearAll, item) => {
    if (clearAll) {
      setnotificationList((list) => []);
    } else {
      setnotificationList((list) => list.filter((l, index) => index !== item));
    }

    setnotificationCount((count) => 0);
  }, null);
  const startOperation = useCallback((result, requestId) => {
    const listItem = {
      listId: requestId,
      status: 0,
      result: result,
    };
    setnotificationList((list) => [...list, listItem]);
    console.log(notificationList);
  }, null);
  return (
    <div className='App'>
      <header>
        <PrimarySearchAppBar
          notificationList={notificationList}
          notificationCount={notificationCount}
          onNotificationOpen={onNotificationOpen}
          onClearNotification={onClearNotification}
          onReceiveNotification={onReceiveNotification}
          onStartOperation={startOperation}
        />
      </header>
      {/* <Chat receiveNotification={onReceiveNotification} /> */}
    </div>
  );
}

export default App;

import {
  IconButton,
  Badge,
  Popover,
  ListItem,
  ListItemText,
  List,
  Divider,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import NotificationsIcon from "@material-ui/icons/Notifications";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginLeft: {
    marginLeft: theme.spacing(3),
  },
  marginRightButton: {
    marginRight: "20px",
    marginTop: "10px",
    height: "40px",
  },
  marginDiv: {
    margin: theme.spacing(1),
  },
  floatLeft: {
    float: "left",
  },
  popoverWidth: {
    width: "300px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export const NavBarNotification = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const len1 = props.notificationList && props.notificationList.length;
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    props.onNotificationPopupOpen();
  };
  const onDeleteClick = (deleteAll, item) => {
    props.onClearNotification(deleteAll, item);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div>
        <IconButton
          aria-label='show 17 new notifications'
          color='inherit'
          onClick={handleClick}
        >
          <Badge badgeContent={props.notificationCount} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {props.notificationList.some((l) => l.status === 0) && (
          <LinearProgress color='primary' />
        )}
      </div>
      <Popover
        open={open && props.notificationList.length}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className={classes.popoverWidth}>
          <div className={classes.sectionDesktop}>
            <div className={classes.grow} />
            <div className={classes.marginRightButton}>
              <Button color='primary' onClick={() => onDeleteClick(true, null)}>
                Dismiss All
                <DeleteIcon fontSize='small' />
              </Button>
            </div>
          </div>
          <div>
            <Divider></Divider>
            <List>
              {props.notificationList.length &&
                props.notificationList.map((l, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={l.result}
                      secondary={
                        <React.Fragment>
                         { l.status === 0 && <LinearProgress color='primary' />}
                        </React.Fragment>
                      }
                    />
                    {/* {l.status === 0 &&  */}
                    <LinearProgress color='primary' />
                    {/* } */}
                    <IconButton
                      onClick={() => onDeleteClick(false, index)}
                      aria-label='delete'
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </ListItem>
                ))}
            </List>
          </div>
        </div>
      </Popover>
    </div>
  );
};

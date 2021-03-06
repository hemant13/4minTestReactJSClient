import React, { useState } from "react";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { NavBarNotification } from "./NavBarNotification";
import {
  Button,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Home } from "@material-ui/icons";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Chat from "../Chat";
import Project from "../Project";
//import Chat from "../Chat";
//https://codesandbox.io/s/material-demo-605w9?file=/demo.js:1983-1988
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      backgroundColor: "transparent",
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },

  toolbar: theme.mixins.toolbar,
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: "calc(100% - ${drawerWidth}px)",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    // background: "transparent",
  },
  content: {
    // flexGrow: 1,
    display: "flex",
    paddingLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
  },
}));
const navLinks = [
  { title: "Project", path: "/project" },
  { title: "Chat", path: "/chat" },
  { title: "product", path: "/product" },
  { title: "blog", path: "/blog" },
  { title: "contact", path: "/contact" },
  { title: "faq", path: "/faq" },
];

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  //const popupOpen = props.onNotificationPopupOpen;
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    var s = window.prompt("d");
    setMobileMoreAnchorEl(s);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} key='lll'>
      <CssBaseline key='cssb' />
      <AppBar position='static'>
        <Toolbar key='toolbar'>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
          >
            <Home fontSize='large' />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            Azure SignalR Demo
          </Typography>
          <div className={classes.grow} />
          <List
            component='nav'
            aria-labelledby='main navigation'
            className={classes.navDisplayFlex}
          ></List>
          <div className={classes.sectionDesktop}>
            <NavBarNotification
              notificationList={props.notificationList}
              notificationCount={props.notificationCount}
              onNotificationPopupOpen={props.onNotificationOpen}
              onClearNotification={props.onClearNotification}
            />
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <nav className={classes.drawer} aria-label='mailbox folders'>
          <Hidden smUp implementation='css'>
            <Drawer
              // container={container}
              variant='temporary'
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div className={classes.toolbar} />
              <Divider />
              <List>
                {navLinks.map(({ title, index }) => (
                  <ListItem key={index} component={Link} to={"/" + title}>
                    <ListItemIcon>
                      <ChatBubbleOutlineRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route
              exact
              path='/Chat'
              render={() => (
                <Chat
                  receiveNotification={props.onReceiveNotification}
                  startOperation={props.onStartOperation}
                />
              )}
            />
            <Route
              exact
              path='/Project'
              render={() => (
                <Project
                  receiveNotification={props.onReceiveNotification}
                  startOperation={props.onStartOperation}
                />
              )}
            />
            {navLinks.map(
              ({ title, path }) =>
                title !== "Chat" &&
                title !== "Project" && (
                  <Route path={path} render={() => <div>{title}</div>} />
                )
            )}
          </Switch>
        </main>
      </BrowserRouter>
      {renderMenu}
    </div>
  );
}

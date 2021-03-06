import React, { Component } from "react";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import * as Icon from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Badge } from "react-bootstrap";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SaveIcon from "@material-ui/icons/Save";
import { default as ButtonR } from "@material-ui/core/Button";
import { TextField, Paper, Typography } from "@material-ui/core";
const useStyles = (theme) => ({
  root: {
    // "& > *": {
    //   margin: theme.spacing(1),
    // },
    padding: theme.spacing(3, 2),
    width: 460,
    // marginLeft: theme.spacing(23),
    alignItems: "center",
    //backgroundColor: "red",
  },

  button: {
    margin: theme.spacing(1),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "400px",
  },
  typography: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nick: "",
      hubConnection: null,
      projectName: "",
      projectId: 0,
      customerName: "",
      result: "",
      waitTime: 0,
      token: "",
      callback: props.receiveNotification,
      user: "",
      formName: "Project Form",
      startOperation: props.startOperation,
    };
  }

  componentDidMount = () => {
    //const nick = ""; // window.prompt("Your name:", "Hemant");
    const token = ""; // window.prompt("Bearer Token:", "");
    this.setState({ token: token });

    const hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:44384/chatHub", {
        accessTokenFactory: () => this.state.token,
      })
      //.withUrl("https://4mintest.azurewebsites.net/chatHub")
      // .withUrl("https://fourmintestresourse.azure-api.net/4mintest/chatHub")
      // (opts) => {
      // opts.Headers.Add("Access-Control-Allow-Credentials", "true");
      //}
      //)
      .build();
    this.setState({ hubConnection, nick: "hemant" }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log("Connection started!"))
        .catch((err) => {
          console.log("Error while establishing connection :(" + err);
        });
      this.state.hubConnection.on(
        "ReceiveSaveProjectResult",
        (data, requestId) => {
          console.log(data, requestId);
          //const text = `${nick}: ${data}`;
          //const messages = this.state.messages.concat([text]);
          this.setState({ result: data });
          this.state.callback(data, requestId);
        }
      );
    });
  };

  saveProject = () => {
    const requestId = Math.floor(Date.now() / 1000);
    this.state.hubConnection
      .invoke(
        "SaveProject",
        this.state.projectName,
        parseInt(this.state.projectId),
        this.state.customerName,
        this.state.user,
        parseInt(this.state.waitTime),
        requestId.toString()
      )
      .catch((err) => console.error(err));

    this.setState({ result: "" });
    this.state.startOperation("Saving is in progress...", requestId);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Typography
            className={classes.typography}
            variant='h6'
            component='h6'
          >
            {this.state.formName}
          </Typography>
          <form
            //className={this.state.cl}
            noValidate
            autoComplete='off'
          >
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel htmlFor='component-outlined'>Token</InputLabel>
              <OutlinedInput
                id='component-outlined'
                value={this.state.token}
                onChange={(e) => this.setState({ token: e.target.value })}
                label='Name'
              />
            </FormControl>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel htmlFor='component-outlined'>Wait Time</InputLabel>
              <OutlinedInput
                id='component-outlined'
                value={this.state.waitTime}
                onChange={(e) =>
                  this.setState({
                    waitTime: e.target.value,
                  })
                }
                label='Wait Time'
              />
            </FormControl>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel htmlFor='component-outlined'>Project Name</InputLabel>
              <OutlinedInput
                id='component-outlined'
                value={this.state.projectName}
                onChange={(e) => this.setState({ projectName: e.target.value })}
                label='Project Name'
              />
            </FormControl>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel htmlFor='component-outlined'>Project Id</InputLabel>
              <OutlinedInput
                id='component-outlined'
                value={this.state.projectId}
                onChange={(e) => this.setState({ projectId: e.target.value })}
                label='Project Id'
              />
            </FormControl>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel htmlFor='component-outlined'>
                Customer Name
              </InputLabel>
              <OutlinedInput
                id='component-outlined'
                value={this.state.customerName}
                onChange={(e) =>
                  this.setState({ customerName: e.target.value })
                }
                label='Customer Name'
              />
            </FormControl>
            <ButtonR
              variant='contained'
              color='primary'
              size='small'
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={this.saveProject}
            >
              Save Project
            </ButtonR>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(useStyles)(Project);

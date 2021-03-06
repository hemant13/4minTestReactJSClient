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
import { TextField, Paper, Typography, Divider } from "@material-ui/core";
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

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nick: "",
      message: "",
      messages: [],
      hubConnection: null,
      a: 0,
      b: 0,
      result: "",
      waitTime: 0,
      token: "",
      callback: props.receiveNotification,
      name: "",
      formName: "Multiply Sample Form",
      startOperation: props.startOperation,
      // classes: useStyles,
    };
  }

  componentDidMount = () => {
    const nick = ""; // window.prompt("Your name:", "Hemant");
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
    this.setState({ hubConnection, nick }, () => {
      this.state.hubConnection
        .start()
        .then(() => console.log("Connection started!"))
        .catch((err) => {
          console.log("Error while establishing connection :(" + err);
        });
      this.state.hubConnection.on("SendMessage", (nick, receivedMessage) => {
        const text = `${nick}: ${receivedMessage}`;
        const messages = this.state.messages.concat([text]);
        this.setState({ messages });
      });
      this.state.hubConnection.on("SendUser", (nick, receivedMessage) => {
        const text = `${nick}: ${receivedMessage}`;
        const messages = this.state.messages.concat([text]);
        this.setState({ messages });
      });
      this.state.hubConnection.on("ReceiveMessage", (data) => {
        console.log(data);
        const text = `${nick}: ${data}`;
        const messages = this.state.messages.concat([text]);
        this.setState({ messages });
      });
      this.state.hubConnection.on("ReceiveMessage1", (data) => {
        console.log(data);
        const text = `${nick}: ${data}`;
        const messages = this.state.messages.concat([text]);
        this.setState({ messages });
      });
      this.state.hubConnection.on(
        "ReceiveCalculateResult",
        (data, requestId) => {
          console.log(data);
          //const text = `${nick}: ${data}`;
          //const messages = this.state.messages.concat([text]);
          this.setState({ result: data });
          this.state.callback(data, requestId);
        }
      );
    });
  };

  // handleChange = (event) => {
  //   setName(event.target.value);
  // };

  sendMessage = () => {
    this.state.hubConnection
      .invoke("SendMessage", this.state.nick, this.state.message)
      .catch((err) => console.error(err));

    this.setState({ message: "" });
  };
  sendMessagetoUser = () => {
    this.state.hubConnection
      .invoke("SendUser", this.state.nick, this.state.nick, this.state.message)
      .catch((err) => console.error(err));

    this.setState({ message: "" });
  };

  calculate = () => {
    const requestId = Math.floor(Date.now() / 1000);
    this.state.hubConnection
      .invoke(
        "Calculate",
        this.state.nick,
        parseInt(this.state.a),
        parseInt(this.state.b),
        parseInt(this.state.waitTime),
        requestId.toString()
      )
      .catch((err) => console.error(err));

    this.setState({ result: "" });

    this.state.startOperation("Waiting for the result...", requestId);
    
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
          {/* <Divider className={classes.typography} /> */}
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
                onChange={(e) => this.setState({ waitTime: e.target.value })}
                label='Wait Time'
              />
            </FormControl>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel htmlFor='component-outlined'>1st Number</InputLabel>
              <OutlinedInput
                id='component-outlined'
                value={this.state.a}
                onChange={(e) => this.setState({ a: e.target.value })}
                label='1st Number'
              />
            </FormControl>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel htmlFor='component-outlined'>2nd Number</InputLabel>
              <OutlinedInput
                id='component-outlined'
                value={this.state.b}
                onChange={(e) => this.setState({ b: e.target.value })}
                label='2nd Number'
              />
            </FormControl>
            {/* <FormControl disabled>
              <InputLabel htmlFor='component-disabled'>=</InputLabel>
            </FormControl> */}
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='component-helper'>Result</InputLabel>
              <Input
                readOnly
                id='component-disabled'
                value={this.state.result}
                onChange={(e) => this.setState({ result: e.target.value })}
              />
            </FormControl>
            <ButtonR
              variant='contained'
              color='primary'
              size='small'
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={this.calculate}
            >
              Multiply
            </ButtonR>
          </form>
        </Paper>
        {/* <div
          style={{
            width: "600px",
            alignContent: "center",
          }}
        >
          <br />
          <input
            type='text'
            value={this.state.token}
            placeholder='token'
            onChange={(e) => this.setState({ token: e.target.value })}
          />
          <br />
          <input
            type='text'
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />

          <button onClick={this.sendMessage}>Send To All</button>
          <button onClick={this.sendMessagetoUser}>Send To User</button>
          <br />
          <div>
            <span key='11'>Wait Time :</span>
            <input
              type='text'
              value={this.state.waitTime}
              onChange={(e) => this.setState({ waitTime: e.target.value })}
            />
          </div>
          <div>
            <input
              type='text'
              value={this.state.a}
              onChange={(e) => this.setState({ a: e.target.value })}
            />
            X
            <input
              type='text'
              value={this.state.b}
              onChange={(e) => this.setState({ b: e.target.value })}
            />
            <button onClick={this.calculate}> Multiply </button> =
            <span
              style={{
                display: "inline",
                background: "silver",
                marginleft: "10px",
                width: "50px",
                marginTop: "3px",
              }}
              key='11'
            >
              {this.state.result || "  result"}
            </span>
          </div>

          <div>
            {this.state.messages.map((message, index) => (
              <span style={{ display: "block" }} key={index}>
                {" "}
                {message}{" "}
              </span>
            ))}
          </div>
        </div>
       */}
      </div>
    );
  }
}

export default withStyles(useStyles)(Chat);

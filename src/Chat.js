import React, { Component } from "react";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

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
    };
  }

  componentDidMount = () => {
    const nick = window.prompt("Your name:", "John");
    const hubConnection = new HubConnectionBuilder()
      //  .withUrl("https://localhost:44384/chatHub")
      .withUrl("https://4mintest.azurewebsites.net/chatHub")
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
      this.state.hubConnection.on("ReceiveCalculateResult", (data) => {
        console.log(data);
        //const text = `${nick}: ${data}`;
        //const messages = this.state.messages.concat([text]);
        this.setState({ result: data });
      });
    });
  };

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
    this.state.hubConnection
      .invoke(
        "Calculate",
        this.state.nick,
        parseInt(this.state.a),
        parseInt(this.state.b),
        parseInt(this.state.waitTime)
      )
      .catch((err) => console.error(err));

    this.setState({ result: "" });
  };

  render() {
    return (
      <div
        style={{
          width: "600px",
          alignContent: "center",
        }}
      >
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
          <span
            // style={{
            //   display: "inline",
            //   background: "silver",
            //   marginleft: "10px",
            //   width: "50px",
            //   marginTop: "3px",
            // }}
            key='11'
          >
            Wait Time :
          </span>
          <input
            type='text'
            value={this.state.waitTime}
            onChange={(e) => this.setState({ waitTime: e.target.value })}
          />
        </div>
        <div
        // style={{
        //   width: "600px",
        //   alignContent: "center",
        // }}
        >
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
    );
  }
}

export default Chat;

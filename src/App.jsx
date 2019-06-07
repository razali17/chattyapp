import React, {Component, Fragment} from 'react';
import Navbar from './Navbar.jsx'
import MessageList from './MessageList.jsx'
import Chatbar from './Chatbar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUsers: "",
      currentUser : {name: "Bob"},
      messages: [],
    };
  };

  componentDidMount() {
    const socket = new WebSocket("ws://localhost:3001");
    socket.onmessage = this.handleSocketMessage;
    this.socket = socket;
  }

  //helper functions

  //handles the user input for a new message from Chatbar, sending the content to the websocket in JSON format
  handleSendMessage = (e) =>  {
    const messageContent = e.target.value;
    const newMessage = {type: "newMessage", username: this.state.currentUser.name, content: ""};
    if (e.key === "Enter") {
      const messageContent = e.target.value;
      e.target.value = ""
      newMessage.content = messageContent;
      this.socket.send(JSON.stringify(newMessage));
    };
  };

  //handles the user input for a new user from Chatbar, sending the content to the websocket in JSON format
  handleUserChange = event => {
    event.preventDefault();
    if (event.key === "Enter") {
      const user = {type: "notification", name: event.target.value};
      this.socket.send(JSON.stringify(user));
    }
  }

  //handles the websocket responses
  handleSocketMessage = event => {
    const json =JSON.parse(event.data);

    switch (json.type) {
      //updates the state of online users after a user connects to the websocket
      case "initialMessage":
        const newOnlineUsers = "Online users: "+json.count;
        this.setState({
          onlineUsers: newOnlineUsers
        });
        break;

      case "messageAdded":
        //updates the state of messages with the new message
        const oldmessages = this.state.messages;
        const newMessage = {id: json.id, username: json.username, content: json.content};
        this.setState(prevState => ({
          messages: [... oldmessages, newMessage]
        }));
        break;
      case "postNotification":
      //updates the state of messages with the new notification
        const oldUser = this.state.currentUser.name;
        const oldmessage = this.state.messages;
        const newMessages = {id: json.id, notification: oldUser+" has changed their name to: "+json.name};
        this.setState(prevState => ({
          messages: [... oldmessage, newMessages], currentUser : {name : json.name}
        }));
        break;
      case "disconnectMessage":
      //updates the state of online users after a user disconnects from the websocket
        const nowOnlineUsers = "Online users: "+json.numUsers;
        this.setState({
          onlineUsers: nowOnlineUsers
        });
        break;

      default:
    };
  };

  render() {
    return (
      <div>
        <Navbar onlineUsers={this.state.onlineUsers} />
        <MessageList messages={this.state.messages}/>
        <Chatbar onChange={this.handleChange} newUser={this.handleUserChange} sendMessage={this.handleSendMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  };
};

export default App;

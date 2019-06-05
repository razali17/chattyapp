import React, {Component, Fragment} from 'react';
import Navbar from './Navbar.jsx'
import MessageList from './MessageList.jsx'
import Chatbar from './Chatbar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser : {name: "Mustafa"},
      messages: [{username: "Bob", content: "Has anyone seen my marbles?", id: 0},
                 {username: "Holly", content: "Yeah I ate them", id: 1},
                 {username: "Bob", content: "So Lame", id: 2}],
      text: ""
    };
  }

  handleChange1 = (e) => {
    this.setState({value: e.target.value})
  }


  handleSendMessage = (e) =>  {
    e.preventDefault();
    let messageContent = e.target.value
    let newMessage = {username: this.state.currentUser.name, content: "", id: 5}
    const oldmessages = this.state.messages
    if (e.key === "Enter") {
      messageContent = e.target.value
      e.target.value = ""
      newMessage.content = messageContent
      this.setState(prevState => ({
        // messages: prevState.messages.concat(messageContent),
        text: messageContent,
        messages: [... oldmessages, newMessage]
      }))
    }
  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages}/>
        <Chatbar text={this.state.text} onChange={this.handleChange} sendMessage={this.handleSendMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  };
}

export default App;

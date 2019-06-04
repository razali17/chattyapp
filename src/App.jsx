import React, {Component, Fragment} from 'react';
import Navbar from './Navbar.jsx'
import MessageList from './MessageList.jsx'
import Chatbar from './Chatbar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser : {name: "Razor"},
      messages: [{username: "Bob", content: "Has anyone seen my marbles?", id: 1},{username: "Ben", content: "Yeah I ate them", id: 2},{username: "Bob", content: "So Lame", id: 3}]
    }

  }
  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages}/>
        <Chatbar currentUser={this.state.currentUser}/>
      </div>
    );
  };
}

export default App;

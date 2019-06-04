import React, { Component } from "react";

class Chatbar extends Component {
  render () {
  return (
    <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name} name="user">
        </input>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER">
        </input>
    </footer>
  )
}
}

export default Chatbar;


import React, { Component } from "react";

class Chatbar extends Component {


  render () {
  return (
    <form onSubmit={this.handleSubmit}>
      <footer className="chatbar">
          <input className="chatbar-username" placeholder={this.props.currentUser.name} name="user">
          </input>
          <input className="chatbar-message" onKeyUp={this.props.sendMessage} placeholder="Type a message and hit ENTER">
          </input>
      </footer>
    </form>
  )
}
}

export default Chatbar;


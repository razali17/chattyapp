import React, { Component } from "react";

class Navbar extends Component {
  render () {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <h5 className="navbar-onlineUsers">{this.props.onlineUsers}</h5>
    </nav>
  )
}
}

export default Navbar;


import React, { Component } from 'react';

class Message extends Component {
  render (){
    return (
    <div className="message">
      <h4 className="notification">{this.props.message.notification}</h4>
      <span className="message-username">{this.props.message.username}</span>
      <span className="message-content">{this.props.message.content}</span>
    </div>
  )
}
}

export default Message;
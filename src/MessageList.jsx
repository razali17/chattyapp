import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render () {
    const messageItems = this.props.messages.map(message => (
      <Message key={message.id} message={message} />))
  return (
    <main className="messages">
    {messageItems}
    </main>
  )
  }
}

export default MessageList;
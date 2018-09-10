import React from 'react';

import Flash from '../../lib/Flash';

class FlashMessages extends React.Component {
  state = {}

  componentDidUpdate() {
    const messages = Flash.getMessages();

    if(!messages) return false;

    this.setState({ messages });
    Flash.clearMessages();

    setTimeout(() => this.setState({ messages: null }), 3000);
  }

  render() {
    const messages = this.state.messages;

    return (
      <div>
        {messages && messages.map((message, index) =>
          <div key={index} className="flash">
            {message.content}
          </div>
        )}
      </div>
    );
  }
}

export default FlashMessages;

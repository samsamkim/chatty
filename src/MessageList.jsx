import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {

  constructor(props){
    super(props);
  }
  render() {

    const messageList = this.props.messages.map(obj => {
      if(obj.type === "incomingMessage"){
        return(<div className="message" key={obj.id}>
          <span style={{"color": obj.color}} className="message-username">{obj.username}</span>
          <span className="message-content">{obj.content}</span>
          </div>)
      }else {
        return(<div className="message system" key={obj.id}>
          {obj.prevUser} changed their name to {obj.currentUser}.
        </div>)
      }
    });
    return (
      <main className="messages">
      {messageList}
      </main>
    );
  }
}




import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: "black",
      userNumbers: 0,
      currentUser: {name: "Anonymous"},
      messages:[],
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewName = this.onNewName.bind(this);
  }

  componentDidMount() {
    //sets up connect with server
    this.socket = new WebSocket("ws://localhost:3001/");
    //recieving data from server
    this.socket.addEventListener('message', (messageEvent) => {
      const messageObject = JSON.parse(messageEvent.data);
      if(messageObject.type === "colorType"){
        this.setState({color: messageObject.color});
      }else if(messageObject.type === "counterType"){
        this.setState({userNumbers: messageObject.counter});
      }else{
        this.setState({messages: [...this.state.messages, messageObject],});
      }
    });
  }

  onNewMessage(newMessage) {
    this.socket.send(JSON.stringify({type: "postMessage", username:this.state.currentUser.name, messages:newMessage, color: this.state.color}));
  }
  onNewName(newName){
    this.socket.send(JSON.stringify({type: "postNameChange", currentUser: newName, prevUser:this.state.currentUser.name}));
    this.setState({currentUser: {name: newName}});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
            <div className="chatLogo">
            <i className="fas fa-comment"></i>
            </div>
          </a>
          <div className="activeUsers">
             <i className="fas fa-user userIcon"/> {this.state.userNumbers}
          </div>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar onNewName={this.onNewName} currentUser={this.state.currentUser.name} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}
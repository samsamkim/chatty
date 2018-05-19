import React, {Component} from 'react';


export default class ChatBar extends Component {

  constructor(props){
    super(props);
    this.state = {value: ""};
    this.keyPress = this.keyPress.bind(this);
    this.namePress = this.namePress.bind(this);

  }




   keyPress(e){
      if(e.keyCode == 13){
        this.props.onNewMessage(e.target.value);
        e.target.value = "";

      }
   }

   namePress(e){
    if(e.keyCode == 13){
      this.props.onNewName(e.target.value);
    }
  }

  render(){
    return (
        <footer className="chatbar">
          <input className="chatbar-username" onKeyDown={this.namePress} placeholder="Your Name (Optional)" defaultValue={this.props.currentUser}/>
          <input className="chatbar-message" onKeyDown={this.keyPress} placeholder="Type a message and hit ENTER" />
        </footer>
    );
  }
}

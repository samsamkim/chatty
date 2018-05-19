import React, {Component} from 'react';


export default class Message extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="message">
        <span className="message-username"></span>
        <span className="message-content"></span>
      </div>
    );
  }
}

var React = require('react')
var ReactDOM = require('react-dom')
var Messages = require('./Messages');
var Channels = require('./Channels');
var Modal = require('react-modal');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const DEFAULT_CHANNEL = 'general';

//Create a new React component named chat
var Chat = React.createClass({

  //Invoked once before the component is mounted
  getInitialState: function() {
    return {
      //initial state will have a "name" variable with value = "Anonymous"
      //This "name" varuable is accessible for render as "this.state.name"
      name: null,
      //messages is now an associate of arrays
      messages: {},
      channels: [],
      currentChannel: null
    }
  },

  //Invoked once, only on the client (not on the server),
  //immediately after the initial rendering occurs
  componentDidMount: function() {
    this.createChannel(DEFAULT_CHANNEL);

    var messages = {};

    messages[DEFAULT_CHANNEL] = [
      {
        name: "ThibaultClment",
        time: new Date(),
        text: "Hi there! 😘"
      },
      {
        name: "ThibaultClment",
        time: new Date(),
        text: "Welcome to my chat app built with React"
      }
    ]

    this.setState({
      messages: messages
    })

  },

  //Invoked immediately after the component's updates are flushed to the DOM.
  componentDidUpdate: function() {
    $("#message-list").scrollTop($("#message-list")[0].scrollHeight);
  },

  //Sent the message whenver the enter key is press
  sendMessage: function(event) {
    var text = event.target.value;
    if(event.keyCode == 13 && text != "") {
      var message = {
        name: this.state.name,
        time: new Date(),
        text: text
      }

      //Add the new message to the messages arrays
      var messages = this.state.messages;
      messages[this.state.currentChannel].push(message);
      this.setState({messages: messages});
      //The msg input become empty
      $('#msg-input').val('')
    }
  },

  createChannel: function(newChannel) {
    if(!(newChannel in this.state.channels)) {
      var messages = this.state.messages;
      //This new channel has an empty list of messages
      messages[newChannel] = [];

      this.setState({
        channels: this.state.channels.concat(newChannel),
        messages: messages
      });

      this.joinChannel(newChannel);
    }
  },

  joinChannel: function(channelName) {
    this.setState({currentChannel: channelName});
  },

  enterName: function(event) {
    var newName = $('#new-name').val().trim();
    if(newName == "") {
      newName = "Anonymous"
    }
    this.setState({name: newName});
  },

  onEnterForName: function(event) {
    if (event.nativeEvent.keyCode != 13) return;
    this.enterName()
  },

  //Any React component has a render function
  render: function() {

    return (
      <div>

      <Modal
        isOpen={!this.state.name}
        style={customStyles} >

        <h2 className="text-center">Enter your Twitter ID</h2>
        <div>
          <input id="new-name" type="text" onKeyPress={this.onEnterForName}/>
          <button className="btn" onClick={this.enterName}> Join</button>
        </div>
      </Modal>

        {/* all "class" must be transformed to "className" */}
        <div className="header">
          {/* On click the setName function is called*/}
          <div className="team-menu">
            <img className="connection_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABmFBMVEUAAAD////////////////////////////////////2+/LR5bKw1Hmfy1KUxz2VyD2izVKz1nnS5rP////A3JuOw0qKwkCNxD+QxT6Sxj6Txz6SxUnC3Jv1+fGXx2GDvkCGwECIwUCLwj+PxD6PxT+JwUCFwECZyGD2+vGSxWF9vEGAvkGDv0CMwz+Wx2GPw2F4ukJ7u0J+vUGBvkGHwUB8u0KSxGG31pp0uEN3uUJ5u0KFv0CCv0B6u0K415p5uU1yt0N/vUF1uEN8u0zG3bFttURwtkR5ukLH3rGWxnlqtERutUR2uUOZx3l6uVZos0VvtkRxt0Nzt0N8ulVisUVlskVns0VzuENmskVfsEVps0VztlZer0VhsEVjsUVstER1t1aOwXhcrkZdr0VgsEaQwnm/2a9YrUZbrka/2rDz+PFhr09XrEZksE6pzplUq0ZVrEZarUaqzpl0tWJRq0dWrEZ1tmJztWJOqUdSq0dxtGJMqEdNqUdQqkdytWKmzJhXrFBKqEdZrU+716+GvXhjr1dIp0hkr1dYtVOVAAAAFHRSTlMAV8/v/wCH+x/n////////////9kvBHZAAAAG7SURBVHgBvdOxjtNAEIDhGe/MZO3sxVaiIJkiSNdQUPJOeQlqXoCCIg/EU9BQHRKg5CT7ErzrHTa+aBOqaxC/tdLK+2kbj+H/hoWhlCmQr0HeyYxyM8mvkWHKoAfBS6cBWEeYugAzf4QGp1SV8DvU/ZjBdN7iud6hdnOTdl+TuALyrUPEwfdu3nc1ipr9AwdIFZPysJylRDfa6cZL2rfgMd9QjO8R0Y+/u7sa4LHZz4wN/MXEyw1hbK1VZdV7PZ1OyufzktsxXADCW5EkXq06Paan02Uoo3kHmAEzJ8HBN6v5qlkqaxTmCdAzQK8Noi6rXwCrJyutepUMAARnXS++3cvm2xvftR0PzAyQAXtwdNChifvFHppBdR003IDCIg6JDOse4DX8WIdo1TwfpaUgqWC9c4eqqg5HF20QZdAMmDlasdHWkrKR03J0A4iIXRTrpba29laiY8YMyOyMKYkXroyROZZuwVTyztAFJPmZKBGq+FxFVBr5BHr7ubd3GICfAM+88qDHHYe/BmbbIAaGKU/Fz10emDxyHxBhgJTg+DGP3O3QbltMBkd92F2H9sWxB772wo9z2z8FfwDHWbdKLDfq1AAAAABJRU5ErkJggg=="/>
            {this.state.name}
          </div>
          <div className="channel-menu">
            <span className="channel-menu_name">
              <span className="channel-menu_prefix">#</span>
              {this.state.currentChannel}
            </span>
          </div>
        </div>
        <div className="main">
          <div className="listings">
            <Channels
              channels={this.state.channels}
              createChannel={this.createChannel}
              currentChannel={this.state.currentChannel}
              joinChannel={this.joinChannel} />
          </div>
          <div className="message-history">
            {/* Add the Messages component and passes the arrays of messages as a property */}
            <Messages
              messages={this.state.messages[this.state.currentChannel]} />
          </div>
        </div>
        <div className="footer">
          <div className="user-menu">
            <p className="disclaimer">This demo is not created by, affiliated with, or supported by Slack Technologies, Inc.</p>
          </div>
          <div className="input-box">
            <input id="msg-input" type="text" className="input-box_text" onKeyDown={this.sendMessage} />
          </div>
        </div>
      </div>)
  }
})

//Render the React chat component I just created
ReactDOM.render(<Chat />, document.getElementById('app'));

//Useful for browserify
module.exports = Chat;

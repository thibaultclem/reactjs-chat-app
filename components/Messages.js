var React = require('react');
var ReactDOM = require('react-dom');

var Messages = React.createClass({

  render: function() {

    //A map function iterate to each elements of an array (here is message)
    //and return the transform version of it
    var messageList = this.props.messages.map(function(message, i) {
      var text = message.text
      return (

        <div key={i} className="message">
        {/* key={i} helps React to render the markup as quick as possible */}
          <a href={"https://twitter.com/" + message.name + "/"} target="_blank"><img src={"https://twitter.com/" + message.name + "/profile_image"} className="message_profile-pic" /></a>
                  <a href={"https://twitter.com/" + message.name + "/"} target="_blank" className="message_username">{message.name}</a>
          <span className="message_timestamp">{message.time.toLocaleTimeString()}</span>
          {/* dangerouslySetInnerHTML sanitize the untrusted text entered by the user */}
          <span className="message_content" dangerouslySetInnerHTML={{__html: text}}></span>
        </div>
      )
    })

    return (
      <div id="message-list">
        <div className="time-divide">
          <span className="date">
          </span>
        </div>
        {messageList}
      </div>
    )
  }
})

module.exports = Messages;

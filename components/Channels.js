var React = require('react');
var ReactDOM = require('react-dom');
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

var Channels = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  joinNewChannel: function() {
    var newChannel = $('#new-channel-name').val().trim();
    if(newChannel != "") {
      this.props.createChannel(newChannel);
      this.closeModal();
    }
  },

  onEnterForChannel: function(event) {
    if (event.nativeEvent.keyCode != 13) return;
    this.joinNewChannel()
  },

  switchChannel: function(channelName) {
    this.props.joinChannel(channelName);
  },

  render: function() {

    var that = this; //to be able to access this in the map function below
    var currentChannel = this.props.currentChannel;
    var channelList = this.props.channels.map(function(channel,i) {
      return (

        <li key={i} className={channel === currentChannel ? "channel active" : "channel"} onClick={that.switchChannel.bind(that, channel)}>
          <a className="channel_name">
            <span className="unread">0</span>
            <span><span className="prefix">#</span>{channel}</span>
          </a>
        </li>

      )
    })

    return (

      <div className="listings_channels">
        <span className="add_icon" onClick={this.openModal}>+</span>
        <h2 className="listings_header">Channels</h2>
          <ul className="channel_list">
            {channelList}
          </ul>

          <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 className="text-center">Enter a channel</h2>
          <div>
            # <input id="new-channel-name" type="text" onKeyPress={this.onEnterForChannel}/>
            <button className="btn" onClick={this.joinNewChannel}> Join</button>
          </div>
        </Modal>

      </div>

    )
  }

})

module.exports = Channels;

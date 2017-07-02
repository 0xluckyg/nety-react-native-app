import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import * as messagesActions from '../../actions/messagesActions';

const window = Dimensions.get('window');

class ChatRoom extends Component {
	constructor(props) {
    	super(props);    	
    	this.onSend = this.onSend.bind(this);		
		this.fetchInitialMessages = this.fetchInitialMessages.bind(this);
  	}

	fetchInitialMessages() {
		if (!this.props.messages[this.props.chatroomId]) {				
			this.props.getMessages({
				chatroomId: this.props.chatroomId,
				start: 0
			})
		}	
	}

  	componentWillMount() {								    	
		this.fetchInitialMessages();
	}
	componentDidUpdate(props) {		
		this.fetchInitialMessages();	
	}

	onSend(msg) {
		const sendMsg = {
			text: msg[0].text,
			toId: this.props.user._id,
			chatroomId: this.props.chatroomId
		}		
    	this.props.sendMessage(sendMsg);
	}

	render() {						
    	return (			
	      		<GiftedChat
					style={{alignSelf: 'flex-start'}}
	        		messages={this.props.messages[this.props.chatroomId]}
	        		onSend={this.onSend}
	        		user={{_id: this.props.self._id}}					
	      		/>
    	);
	}
}

const mapStateToProps = (state) => (
	{
		messages: state.messages.messages
	}
)

export default connect(mapStateToProps, messagesActions)(ChatRoom);

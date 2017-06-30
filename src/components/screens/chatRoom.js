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
    	this.state = {
			chatroomId: ''			
		};
    	this.onSend = this.onSend.bind(this);
  	}

  	componentWillMount() {	
		Actions.refresh({title: this.props.user.name.first + " " + this.props.user.name.last});

		function createChatroomId(id1, id2) {
			const compare = id1.localeCompare(id2);    
			if (compare === -1) {
				return id1 + id2;
			} else {
				return id2 + id1;
			}    
		}
		
	    this.setState({
			chatroomId: createChatroomId(this.props.self._id, this.props.user._id),
	    });		

		if (this.props.messages[this.state.chatroomId]) {
			this.props.getMessages({
				chatroomId: this.state.chatroomId,
				start: this.props.messages[this.state.chatroomId].length
			})
		} else {
			this.props.getMessages({
				chatroomId: this.state.chatroomId,
				start: 0
			})
		}		
	}

	onSend(msg) {
		const sendMsg = {
			text: msg[0].text,
			toId: this.props.user._id,
			chatroomId: this.state.chatroomId
		}
		console.log('THIS IS MSG.',msg);
		console.log('THIS IS MSG MOFO',sendMsg);
    	this.props.sendMessage(sendMsg);
	}

	render() {
    	return (
	      		<GiftedChat
					style={{alignSelf: 'flex-start'}}
	        		messages={this.props.messages[this.state.chatroomId]}
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

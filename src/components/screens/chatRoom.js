import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	TouchableOpacity,
	Image,
	Text
} from 'react-native';
import Modal from 'react-native-modalbox';
import { GiftedChat } from 'react-native-gifted-chat';
import { Actions } from 'react-native-router-flux';
import {MyColors} from '../../helper/style';
import {ChatButtonImage} from '../../images/images';
import { connect } from 'react-redux';
import * as messagesActions from '../../actions/messagesActions';

const window = Dimensions.get('window');

class ChatRoom extends Component {
	constructor(props) {
    	super(props);    	
    	this.onSend = this.onSend.bind(this);		
		this.fetchInitialMessages = this.fetchInitialMessages.bind(this);		
		this.renderAddUserButton = this.renderAddUserButton.bind(this);
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

	renderAddUserButton() {		
		const messages = this.props.messages[this.props.chatroomId];		
		let senderId = '';		
		if (this.props.isContact) { return }
		if (!messages) { return }
		
		for (let i = 0; i < messages.length; i ++) {			
			let senderId2 = messages[i].user._id.toString();
			if (i === 0) { 
				senderId = senderId2;
			} else {				
				if (senderId !== senderId2) {										
					return (
						<TouchableOpacity 
							onPress={() => {

							}} 
							style={styles.buttonStyle}>
							<Text style={styles.buttonTextStyle}>{`Add ${this.props.user.name.first} to contacts`}</Text>
						</TouchableOpacity>	
					)  
				}
			}	
		}

		return;
	}

	onSend(msg) {
		const sendMsg = {
			text: msg[0].text,
			toId: this.props.user._id,
			chatroomId: this.props.chatroomId,
			name: this.props.user.name
		}		
    	this.props.sendMessage(sendMsg);
	}

	render() {		
    	return (	
			<View style={styles.mainView}>		
				{this.renderAddUserButton()}
				<GiftedChat
					style={{alignSelf: 'flex-start'}}
					messages={this.props.messages[this.props.chatroomId]}
					onSend={this.onSend}
					user={{_id: this.props.self._id}}					
				/>				
			</View>
    	);
	}
}

const styles = StyleSheet.create({    	
	mainView: {
		flex: 1
	},
	buttonStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		backgroundColor: MyColors.myBlue
	},
	buttonTextStyle: {
		fontWeight: '300',
		fontSize: 16,
		color: '#fff'
	},
    staticButton: {		
        marginLeft: window.width - 75,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        backgroundColor: MyColors.myBlue,
        opacity: 0.7
    },
    staticButtonImageStyle: {
        height: 30,
        width: 30
    },
    staticButtonTouchableStyle: {
        flex: 1,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    staticButtonTextStyle: {
        fontSize: 9,
        fontWeight: '200',
        color: '#fff',
        alignSelf: 'center'
	}
})

const mapStateToProps = (state) => (
	{
		messages: state.messages.messages
	}
)

export default connect(mapStateToProps, messagesActions)(ChatRoom);

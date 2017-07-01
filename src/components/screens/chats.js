import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import List from '../reusables/list';

import NoContent from '../reusables/noContent';
import {ChatsNoContentImage} from '../../images/images'
import { connect } from 'react-redux';
import * as chatsActions from '../../actions/chatsActions';

class Chats extends Component {

    constructor(props) {
        super(props);
        this.renderView = this.renderView.bind(this);  
        this.state = {
            chats: [0,1,2,3,4,5]
        }      
    }

    componentWillMount() {
        this.props.getChatrooms();
    }

    renderView() {
        console.log(this.state.chats)
        if (!this.state.chats || this.state.chats.length < 1) {                        
            return <NoContent   
                        image={ChatsNoContentImage}              
                        placeholderText={"You have no chats yet. Talk to people in Network tab!"}
                    />    
        } else {
            console.log('CHATROOMS?', this.props.chatrooms)
            return <List
                        listViewData={this.props.chatrooms}
                        isChat={true}
                        goToOnPress={(data) => {Actions.chatRoomFromChats({self: this.props.self, user: data.user})}}
                    />
        }
    }

    render() {
        return (
            this.renderView()
        );
    }
}

const mapStateToProps = (state) => (
	{
		chatrooms: state.chats.chatrooms,
        self: state.profile.self
	}
)

export default connect(mapStateToProps, chatsActions)(Chats);

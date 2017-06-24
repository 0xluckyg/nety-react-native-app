import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import List from '../reusables/list';

import NoContent from '../reusables/noContent';
import {ChatsNoContentImage} from '../../images/images'

class Chats extends Component {

    constructor(props) {
        super(props);
        this.renderView = this.renderView.bind(this);        
    }

    renderView() {
        if (!this.props.contacts || this.props.contacts.length < 1) {                        
            return <NoContent   
                        image={ChatsNoContentImage}              
                        placeholderText={"You have no chats yet. Talk to people in Network tab!"}
                    />    
        } else {
            return <List
                        listViewData={this.props.contacts}
                        isChat={true}
                        goToOnPress={() => {Actions.chatRoomFromChats()}}
                    />
        }
    }

    render() {
        return (
            this.renderView()
        );
    }
}

export default Chats;

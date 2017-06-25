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
        this.state = {
            chats: [0,1,2,3,4,5]
        }      
    }

    renderView() {
        console.log(this.state.chats)
        if (!this.state.chats || this.state.chats.length < 1) {                        
            return <NoContent   
                        image={ChatsNoContentImage}              
                        placeholderText={"You have no chats yet. Talk to people in Network tab!"}
                    />    
        } else {
            return <List
                        listViewData={this.state.chats}
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

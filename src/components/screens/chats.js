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
        function createChatroomId(id1, id2) {
            const compare = id1.localeCompare(id2);    
            if (compare === -1) {
                return id1 + id2;
            } else {
                return id2 + id1;
            }    
        }        

        if (!this.state.chats || this.state.chats.length < 1) {                        
            return <NoContent   
                        image={ChatsNoContentImage}              
                        placeholderText={"You have no chats yet. Talk to people in Network tab!"}
                    />    
        } else {            
            return <List
                        listViewData={this.props.chatrooms}
                        isChat={true}
                        goToOnPress={(data) => {
                            Actions.chatRoomFromChats({
                                self: this.props.self, 
                                user: data.user,
                                title: data.user.name.first + ' ' + data.user.name.last,
                                chatroomId: createChatroomId(data.user._id, this.props.self._id)
                            }
                        )}}
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

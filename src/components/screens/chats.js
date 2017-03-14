import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import List from '../reusables/list';

class Chats extends Component {

    constructor(props) {
        super(props);
        this.state = {
			listViewData: [1,2,3,4,5,6]
		};
    }

    // removeCell(secId, rowId, rowMap) {
    //     rowMap[`${secId}${rowId}`].closeRow();
    //     const newData = [...this.state.listViewData];
    //     newData.splice(rowId, 1);
    //     this.setState({listViewData: newData});
    // }

    render() {
        return (
            <List
				listViewData={this.state.listViewData}
				isChat={true}
				goToOnPress={() => {Actions.chatRoomFromChats()}}
			/>
        );
    }
}

export default Chats;

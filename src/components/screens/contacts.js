import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as contactsActions from '../../actions/contactsActions';
import List from '../reusables/list';

class Contacts extends Component {

    constructor(props) {
        super(props);
        // this.state = {
		// 	listViewData: [1,2,3,4,5,6,7,8,9,10]
		// };
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
                deletePressed={this.props.removeFromContacts}
				listViewData={this.props.contacts}
				isChat={false}
				goToOnPress={() => {Actions.profile()}}
			/>
        );
    }
}

const mapStateToProps = (state) => (
    {
        contacts: state.contacts.contacts
    }
)

export default connect(mapStateToProps, contactsActions)(Contacts);

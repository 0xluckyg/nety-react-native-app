import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as contactsActions from '../../actions/contactsActions';
import List from '../reusables/list';

import NoContent from '../reusables/noContent';
import {ContactsNoContentImage} from '../../images/images'

class Contacts extends Component {

    constructor(props) {
        super(props);
        this.renderView = this.renderView.bind(this);
    }

    componentWillMount() {
        this.props.getContacts();
    }

    renderView() {
        if (!this.props.contacts || this.props.contacts.length < 1) {                        
            return <NoContent   
                        image={ContactsNoContentImage}              
                        placeholderText={"You have no contacts. Touch the top right button on your chat to add people!"}
                    />    
        } else {
            return <List
                        deletePressed={this.props.removeContact}
                        listViewData={this.props.contacts}
                        isChat={false}
                        goToOnPress={Actions.profileFromContacts}
                        /*deletePressed={(id) => {
                            this.props.removeContact(id)
                        }}
                        blockPressed={(id) => {

                        }}*/
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
        contacts: state.contacts.contacts
    }
)

export default connect(mapStateToProps, contactsActions)(Contacts);

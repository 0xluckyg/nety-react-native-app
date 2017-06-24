import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as settingsActions from '../../../actions/settingsActions';
import List from '../../reusables/list';

import NoContent from '../../reusables/noContent';
import {BlockedNoContentImage} from '../../../images/images'

class Blocked extends Component {

    constructor(props) {
        super(props);
        this.renderView = this.renderView.bind(this);
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

    renderView() {
        if (!this.props.contacts || this.props.contacts.length < 1) {                        
            return <NoContent   
                        image={BlockedNoContentImage}              
                        placeholderText={"You have no blocked people"}
                    />    
        } else {
            return <List
                        deletePressed={() => {}}
                        listViewData={this.props.blocked}
                        isChat={false}				
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
        blocked: state.settings.blocked
    }
)

export default connect(mapStateToProps, settingsActions)(Blocked);

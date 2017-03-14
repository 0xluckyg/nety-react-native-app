import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import List from '../reusables/list';
import Slider from '../reusables/slider';

import { Actions } from 'react-native-router-flux';

class Network extends Component {

    constructor(props) {
        super(props);
        this.state = {
			listViewData: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10]
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
			<View style={styles.mainView}>
            	<List
					listViewData={this.state.listViewData}
					isChat={false}
					goToOnPress={() => {Actions.profile()}}
				/>
				<Slider/>
			</View>
        );
    }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1
	},
});

export default Network;

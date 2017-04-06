import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text
} from 'react-native';

import List from '../reusables/list';
import Slider from '../reusables/slider';

import { Actions } from 'react-native-router-flux';
import * as networkActions from '../../actions/networkActions';
import { connect } from 'react-redux';

import Reactotron from 'reactotron-react-native'

const initialUsers = [
	{
		id: 0,
		firstName: "Donald",
		lastName: "Trump",
		status: "Grab em by the pussy!",
		imageUrl: "https://static3.businessinsider.com/image/56feb17752bcd01b008ba4e8-480/donald-trump.jpg"
	},
	{
		id: 1,
		firstName: "Barack",
		lastName: "Obama",
		status: "Yes We Can!",
		imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/220px-President_Barack_Obama.jpg"
	},
	{
		id: 2,
		firstName: "Bruce",
		lastName: "Wayne",
		status: "I'm Batman!",
		imageUrl: "https://s-media-cache-ak0.pinimg.com/736x/15/46/62/1546621aa77278241275cf101d8b383d.jpg"
	}
]

class Network extends Component {

    constructor(props) {
        super(props);

		console.log(this.props)
		
		Reactotron.error(this.props.network)
				this.props.addToNetwork(initialUsers)

		// this.props.addToNextwork(initialUsers)
        // this.state = {
		// 	listViewData: [1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10]
		// };
    }
    // removeCell(secId, rowId, rowMap) {
    //     rowMap[`${secId}${rowId}`].closeRow();
    //     const newData = [...this.state.listViewData];
    //     newData.splice(rowId, 1);
    //     this.setState({listViewData: newData});
    // }

	componentDidMount() {
		console.log("Component did mount")
	}
	sampleData() {
		// console.log("PRESSED")
		this.props.addToNetwork(initialUsers)
		console.log(this)

	}

    render() {
		console.log("weel them")
		console.log(this)
        return (
			<View style={styles.mainView}>
            	<List
					deletePressed={this.props.removeFromNetwork}
					listViewData={this.props.network}
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

const mapStateToProps = (state) => (
	{
		network: state.network,
		range: state.range
	}
)

export default connect(mapStateToProps, networkActions)(Network);

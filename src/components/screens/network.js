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
		this.updateNavbar(this.props.range)
	}
	
	
	titleForRange(range) {
        switch (range) {
            case 0:
            case 1:
                return "Current Event"
            case 2:
                return "100 Meter"
            case 3:
                return "300 Meters"
            case 4:
                return "500 Meters"
            case 5:
                return "1 KM"
            case 6:
                return "3 KM"
            case 7:
                return "5 KM"
            case 8:
            case 9:
            case 10:
                return "10 KM"
            default:
                return "ERROR"
        }
    }

	updateNavbar(range) {
		let title = this.titleForRange(range)
		console.log(title)
		Actions.refresh({title: title})
	}

	didUpdateRange(range) {
		this.props.updateRange(range)
		this.updateNavbar(range)
	}

    render() {
        return (
			<View style={styles.mainView}>
				<Text>Range: {this.titleForRange(this.props.range)}</Text>
            	<List
					deletePressed={this.props.removeFromNetwork}
					listViewData={this.props.network}
					isChat={false}
					goToOnPress={() => {Actions.profile()}}
				/>
				<Slider value={this.props.range} onValueChange={this.didUpdateRange.bind(this)}/>
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
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



class Network extends Component {

    constructor(props) {
        super(props);

		console.log(this.props)
		
		Reactotron.error(this.props.network)
				// this.props.addToNetwork(initialUsers)

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
		network: state.network.network,
		range: state.network.range
	}
)

export default connect(mapStateToProps, networkActions)(Network);
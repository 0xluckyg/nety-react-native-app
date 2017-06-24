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
import NoContent from '../reusables/noContent';
import {NetworkNoContentImage} from '../../images/images'

class Network extends Component {

    constructor(props) {
        super(props);		
				
        this.renderView = this.renderView.bind(this);	        
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

    renderView() {
        if (!this.props.network || this.props.network.length < 1) {                        
            return <NoContent   
                        image={NetworkNoContentImage}              
                        placeholderText={"No one is around you. Try a bigger range!"}
                    />            
        } else {
            return <List
                blockPressed={this.props.removeFromNetwork}
                listViewData={this.props.network}
                isChat={false}
                goToOnPress={Actions.profile}
            />
        }
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
		Actions.refresh({title: title})
	}

	didUpdateRange(range) {
		this.props.updateRange(range)
		this.updateNavbar(range)
	}

    render() {
        return (
			<View style={styles.mainView}>
            	{this.renderView()}                
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
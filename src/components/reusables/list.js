import React, { Component } from 'react';
import {
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Actions } from 'react-native-router-flux';

import Cell from './cell/cell';
import HiddenCell from './cell/hiddenCell';

class List extends Component {

	constructor(props) {
		super(props);
		this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	}

	render() {
		return (
			<View style={styles.container}>
				<SwipeListView
					dataSource={this.dataSource.cloneWithRows(this.props.listViewData)}
					renderRow={ data => (
						<Cell
							isChat={this.props.isChat}
							data={data}
							goToOnPress={() => 
								{this.props.goToOnPress({user: data})
							}}
						/>
					)}
					renderHiddenRow={ (data, secId, rowId, rowMap) => (
						<HiddenCell
							blockPressed={this.props.blockPressed}
							deletePressed={this.props.deletePressed}
							data={data}
							secId={secId}
							rowId={rowId}
							rowMap={rowMap}
						/>
					)}
					swipeToOpenPercent={100}
                    disableRightSwipe={true}
					disableLeftSwipe={(this.props.blockPressed || this.props.deletePressed) ? false : true}
					rightOpenValue={(!this.props.blockPressed || !this.props.deletePressed) ? -75 : -150}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	}
});

export default List;

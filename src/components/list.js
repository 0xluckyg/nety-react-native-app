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

import Cell from './cell/cell';
import HiddenCell from './cell/hiddenCell';

class List extends Component {

	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			listViewData: Array(20).fill('').map((_,i)=>`item #${i}`)
		};
		this.removeCell = this.removeCell.bind(this)
		this.blockCell = this.blockCell.bind(this)
	}

	removeCell(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({listViewData: newData});
	}

	blockCell(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({listViewData: newData});
	}

	render() {
		return (
			<View style={styles.container}>
					<SwipeListView
						dataSource={this.ds.cloneWithRows(this.state.listViewData)}
						renderRow={ data => (
							<Cell data={data}/>
						)}
						renderHiddenRow={ (data, secId, rowId, rowMap) => (
							<HiddenCell
								secId={secId}
								rowId={rowId}
								rowMap={rowMap}
								removeCell={this.removeCell}
								blockCell={this.blockCell}
							/>
						)}
                        disableRightSwipe={true}
						rightOpenValue={-150}
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

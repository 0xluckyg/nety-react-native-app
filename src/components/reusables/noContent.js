import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
    Image,
    Dimensions
} from 'react-native';

import {MyColors} from '../../helper/style';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class NoContent extends Component {

    constructor(props) {
        super(props);		
    }

    render() {
        return (
			<View style={styles.mainView}>
                <View style={styles.contentView}>
                    <Image source={this.props.image} style={styles.imageStyle}/>
                    <Text style={styles.textStyle}>{this.props.placeholderText}</Text>
                </View>
			</View>
        );
    }
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
	},
    contentView: {
        height: screenHeight * 0.4,
        width: screenHeight * 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        tintColor: MyColors.myBlue,
        height: 80,
        width: 80
    },
    textStyle: {
        marginTop: 20,
        textAlign: 'center',
        color: MyColors.myBlue,
        fontWeight: '300',
        fontSize: 18
    }
});

export default NoContent;
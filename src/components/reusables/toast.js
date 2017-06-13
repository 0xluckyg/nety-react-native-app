import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Dimensions
} from 'react-native';
import {MyColors} from '../../helper/style';

class Toast extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainView}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute'
    }
});
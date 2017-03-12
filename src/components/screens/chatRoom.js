import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

class Chats extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.containerStyle}></View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    }
});

export default Chats;

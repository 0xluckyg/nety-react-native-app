import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

class Profile extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.viewStyle}></View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: 'blue'
    }
});

export default Profile;

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Router from './components/routes';

import Spinner from './components/reusables/spinner';
import Toast from './components/reusables/toast';
import Geo from './geo';

// import BackgroundGeolocation from "react-native-background-geolocation";

class Main extends Component {
    // constructor() {
    //     super();
    // }

    // componentWillMount() {

    // }

    render() {        
        return (            
            <View style={styles.mainViewStyle}>                
                <Geo/>
                <Toast/>
                <Spinner/>
                <Router/>
            </View>            
        );
    }
}

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1
    }
});

export default Main;
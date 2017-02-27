import React, { Component } from 'react';
import { View, Image } from 'react-native';

import Footer from './footer';
import Network from './screens/network';

const App = () => {
    return(
        <View style={styles.viewStyle}>
            <Network style={styles.middleViewStyle}></Network>
            <Footer style={styles.footerStyle}/>
        </View>
    )
}

const styles = {
    viewStyle: {
        flex: 1
    },
    middleViewStyle: {
        flex: 1
    },
    footerStyle: {
        alignSelf: 'flex-end'
    }
}

export default App;

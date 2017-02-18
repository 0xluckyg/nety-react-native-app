import React, { Component } from 'react';
import { View, Image } from 'react-native';

import Header from './components/header';
import Footer from './components/footer';
import List from './components/list';

const App = () => {
    return(
        <View style={styles.viewStyle}>
            <Header headerText='NAV BAR'/>
            <List style={styles.middleViewStyle}></List>
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

import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';

import Main from './main';
import Profile from './screens/profile';

const RouterComponent = () => {
    return(
        <Router>
            <Scene key='root'>
                <Scene
                    key='main'
                    component={Main}
                    navigationBarStyle={styles.headerStyle}
                    titleStyle={styles.headerFontStyle}
                    sceneStyle={styles.sceneStyle}
                    title='Network'
                    initial
                />
                <Scene
                    key='profile'
                    component={Profile}
                    navigationBarStyle={styles.headerStyle}
                    titleStyle={styles.headerFontStyle}
                    sceneStyle={styles.sceneStyle}
                    title='Profile'
                />
            </Scene>
        </Router>
    )
}

const styles = {
    headerStyle: {
        height:60,
        borderBottomWidth: 0.5,
        borderBottomColor: '#707070',
        backgroundColor:'#fff',
    },
    headerFontStyle: {
        fontSize: 20,
        fontWeight: '200'
    },
    sceneStyle: {
        paddingTop: 60
    }
}

export default RouterComponent;

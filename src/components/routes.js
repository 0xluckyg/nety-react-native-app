import React, {Component} from 'react';
import {Image} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

import Network from './screens/network';
import Contacts from './screens/contacts';
import Chats from './screens/chats';
import Profile from './screens/profile/profile';
import Settings from './screens/settings';

import {MyColors} from '../helper/style';

import {
    NetworkImageSelected,
    ContactsImageSelected,
    ChatImageSelected,
    ProfileImageSelected,
    SettingsImageSelected,
    NetworkImage,
    ContactsImage,
    ChatImage,
    ProfileImage,
    SettingsImage,
    BackButtonImage
} from '../images/images';

const TabIcon = ({selected, title}) => {
    let tabBarImage; let selectedTabBarImage;
    switch(title) {
        case 'networkTab':
            tabBarImage = NetworkImage; selectedTabBarImage = NetworkImageSelected; break;
        case 'contactsTab':
            tabBarImage = ContactsImage; selectedTabBarImage = ContactsImageSelected; break;
        case 'chatsTab':
            tabBarImage = ChatImage; selectedTabBarImage = ChatImageSelected; break;
        case 'myProfileTab':
            tabBarImage = ProfileImage; selectedTabBarImage = ProfileImageSelected; break;
        case 'settingsTab':
            tabBarImage = SettingsImage; selectedTabBarImage = SettingsImageSelected; break;
    }

    if (selected) {
        return <Image style={styles.tabImageSelected} source={selectedTabBarImage}/>
    }
    return <Image style={styles.tabImage} source={tabBarImage}/>
}

const RouterComponent = () => {
    return(
        <Router>
            <Scene
                key='root'
            >
                <Scene
                    key='tabBar'
                    tabBarStyle={styles.footerStyle}
                    tabs
                >
                    <Scene key='networkTab' title='networkTab' icon={TabIcon}>
                        <Scene
                            key='network'
                            component={Network}
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
                            backButtonImage={BackButtonImage}
                            titleStyle={styles.headerFontStyle}
                            sceneStyle={styles.profileSceneStyle}
                            hideTabBar={true}
                            direction='horizontal'
                            title='Profile'
                            isMyProfile={false}
                        />
                    </Scene>
                    <Scene key='contactsTab' title='contactsTab' icon={TabIcon}>
                        <Scene
                            key='contacts'
                            component={Contacts}
                            navigationBarStyle={styles.headerStyle}
                            titleStyle={styles.headerFontStyle}
                            sceneStyle={styles.sceneStyle}
                            title='Contacts'
                        />
                    </Scene>
                    <Scene key='chatsTab' title='chatsTab' icon={TabIcon}>
                        <Scene
                            key='chats'
                            component={Chats}
                            navigationBarStyle={styles.headerStyle}
                            titleStyle={styles.headerFontStyle}
                            sceneStyle={styles.sceneStyle}
                            title='My Chats'
                        />
                    </Scene>
                    <Scene key='myProfileTab' title='myProfileTab' icon={TabIcon}>
                        <Scene
                            key='myProfile'
                            component={Profile}
                            titleStyle={styles.headerFontStyle}
                            sceneStyle={styles.myProfileSceneStyle}
                            hideNavBar={true}
                            isMyProfile={true}
                        />
                    </Scene>
                    <Scene key='settingsTab' title='settingsTab' icon={TabIcon}>
                        <Scene
                            key='settings'
                            component={Settings}
                            navigationBarStyle={styles.headerStyle}
                            titleStyle={styles.headerFontStyle}
                            sceneStyle={styles.sceneStyle}
                            title='Settings'
                        />
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    )
}

const styles = {
    headerStyle: {
        height:60,
        borderBottomWidth: 0.5,
        borderBottomColor: MyColors.myGray,
        backgroundColor:'#fff',
    },
    headerFontStyle: {
        fontSize: 20,
        fontWeight: '200'
    },
    sceneStyle: {
        paddingTop: 60,
        paddingBottom: 45.5
    },
    profileSceneStyle: {
        paddingTop: 60
    },
    myProfileSceneStyle: {
        paddingBottom: 45.5
    },
    footerStyle: {
        height: 45,
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderTopColor: MyColors.myGray
    },
    tabImage: {
        resizeMode: 'contain',
        height: 22,
        tintColor: MyColors.myGray
    },
    tabImageSelected: {
        resizeMode: 'contain',
        height: 20,
        tintColor: MyColors.myBlue
    }
}

export default RouterComponent;

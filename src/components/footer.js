import React, { Component } from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const NetworkImageSelected = require('../images/tabBar/Network.png');
const MyNetworkImageSelected = require('../images/tabBar/MyNetwork.png');
const ChatImageSelected = require('../images/tabBar/Chat.png');
const ProfileImageSelected = require('../images/tabBar/Profile.png');
const SettingsImageSelected = require('../images/tabBar/Settings.png');
const NetworkImage = require('../images/tabBar/NetworkEmpty.png');
const MyNetworkImage = require('../images/tabBar/MyNetworkEmpty.png');
const ChatImage = require('../images/tabBar/ChatEmpty.png');
const ProfileImage = require('../images/tabBar/ProfileEmpty.png');
const SettingsImage = require('../images/tabBar/SettingsEmpty.png');

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedTab: 0};
        this.changeTab = this.changeTab.bind(this);
        this.renderTabBarButton = this.renderTabBarButton.bind(this);
    }

    changeTab(tab) {
        console.log(tab);
        this.setState({selectedTab:tab});
    }

    renderTabBarButton(tab) {
        let tabBarImage; let selectedTabBarImage;
        switch(tab) {
            case 0:
                tabBarImage = NetworkImage; selectedTabBarImage = NetworkImageSelected; break;
            case 1:
                tabBarImage = MyNetworkImage; selectedTabBarImage = MyNetworkImageSelected; break;
            case 2:
                tabBarImage = ChatImage; selectedTabBarImage = ChatImageSelected; break;
            case 3:
                tabBarImage = ProfileImage; selectedTabBarImage = ProfileImageSelected; break;
            case 4:
                tabBarImage = SettingsImage; selectedTabBarImage = SettingsImageSelected; break;
        }

        if (this.state.selectedTab === tab) {
            return (
                <TouchableOpacity style={styles.tab} onPress={() => this.changeTab(tab)}>
                    <Image style={styles.tabImageSelected} source={selectedTabBarImage}/>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity style={styles.tab} onPress={() => this.changeTab(tab)}>
                <Image style={styles.tabImage} source={tabBarImage}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.footerStyle}>
                {this.renderTabBarButton(0)}
                {this.renderTabBarButton(1)}
                {this.renderTabBarButton(2)}
                {this.renderTabBarButton(3)}
                {this.renderTabBarButton(4)}
            </View>
        )
    }
}

const styles = {
    footerStyle: {
        flexDirection: 'row',

        height: 45,

        borderTopWidth: 0.5,
        borderTopColor: '#707070'
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    tabImage: {
        resizeMode: 'contain',

        height: 22,

        tintColor: '#707070'
    },
    tabImageSelected: {
        resizeMode: 'contain',

        height: 20,

        tintColor: '#496592'
    }

}

export default Footer;

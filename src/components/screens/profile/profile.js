import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {MyColors} from '../../../helper/style';
import {Background1, Trump} from '../../../images/images';
import Cell from './profileCell';

const mockData = {
    status: "I am somekid",
    about: {
        age: 35,
        school: 'Some college',
        profession: 'Computer science',
        job: 'Some job'
    },
    experiences: [
        {
            name: 'Software Engineer at Nety',
            description: 'I worked as an app developer',
            start: 'Mar 10, 16',
            end: 'Mar 10, 17'
        },
        {
            name: 'App developer at TRN',
            description: 'I worked as an app developer',
            start: 'Mar 10, 16',
            end: 'Mar 10, 17'
        },
        {
            name: 'Marketer at Facebook',
            description: 'I worked as an app developer',
            start: 'Mar 10, 16',
            end: 'Mar 10, 17'
        }
    ]
}

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onScroll = () => {} } = this.props;
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    onScroll={onScroll}
                    contentBackgroundColor={'#fff'}
                    headerBackgroundColor={'blue'}
                    parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                    backgroundSpeed={10}

                    renderBackground={() => (
                        <View key="background">
                        <Image style={{width: window.width,
                                        height: PARALLAX_HEADER_HEIGHT}}
                                        source={Background1}/>
                        <View style={{position: 'absolute',
                                        top: 0,
                                        width: window.width,
                                        backgroundColor: 'rgba(0,0,0,.4)',
                                        height: PARALLAX_HEADER_HEIGHT}}/>
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={ styles.parallaxHeader }>
                            <Image style={ styles.avatar } source={Trump}/>
                            <Text style={ styles.sectionSpeakerText }>
                                Donald Trump
                            </Text>
                            <Text style={ styles.sectionTitleText }>
                                President of the U.S
                            </Text>
                        </View>
                    )}
                >
                    <View style={{ flex: 1 }}>
                        <Cell data={mockData}/>
                    </View>
                </ParallaxScrollView>
                <View style={styles.staticButton}>
                </View>
            </View>
        );
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 80
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    staticButton: {
        marginLeft: Dimensions.get('window').width - 75,
        marginTop: Dimensions.get('window').height - 120,
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        backgroundColor: MyColors.myBlue,
        opacity: 0.7
    }
});

export default Profile;

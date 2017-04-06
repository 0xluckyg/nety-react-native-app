import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import * as profileActions from '../../../actions/profileActions';
import {ChatButtonImage, EditButtonImage} from '../../../images/images';
import {MyColors} from '../../../helper/style';
import {Background1, Trump} from '../../../images/images';
import Cell from './profileCell';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.renderStaticButton = this.renderStaticButton.bind(this);
    }

    displayedUser() {
        return this.props.user || this.props.currentUser
    }

    renderStaticButton() {
        if (this.props.isMyProfile) {
            return (
                <View style={styles.staticButtonMyProfile}>
                    <TouchableOpacity style={styles.staticButtonTouchableStyle} onPress={() => Actions.myProfileEdit()}>
                        <Image style={styles.staticButtonImageStyle} source={EditButtonImage}/>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.staticButton}>
                    <TouchableOpacity style={styles.staticButtonTouchableStyle} onPress={() => Actions.chatRoomFromNetwork()}>
                        <Image style={styles.staticButtonImageStyle} source={ChatButtonImage}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        const { onScroll = () => {} } = this.props;
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    onScroll={onScroll}
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
                            <Image style={ styles.avatar } source={ {uri: this.displayedUser().imageUrl} }/>
                            <Text style={ styles.sectionSpeakerText }>
                                {this.displayedUser().firstName + " " + this.displayedUser().lastName}
                            </Text>
                            <Text style={ styles.sectionTitleText }>
                                {this.displayedUser().bio || "This user has no bio"}
                            </Text>
                        </View>
                    )}
                >
                    <View style={{ flex: 1 }}>
                        <Cell isMyProfile={!!this.props.currentUser} data={this.displayedUser()}/>
                    </View>
                </ParallaxScrollView>
                {this.renderStaticButton()}
            </View>
        );
    }
}






const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const PARALLAX_HEADER_HEIGHT = 300;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    stickyHeaderStyle: {
        backgroundColor: MyColors.myBlue
    },
    stickySectionStyle: {
        backgroundColor: MyColors.myBlue,
        height: 60
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
        paddingTop: 60
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
        fontWeight: '300',
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '200',
        paddingVertical: 5
    },
    staticButtonMyProfile: {
        marginLeft: window.width - 75,
        marginTop: window.height - 180,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        backgroundColor: MyColors.myBlue,
        opacity: 0.7
    },
    staticButton: {
        marginLeft: window.width - 75,
        marginTop: window.height -130,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        backgroundColor: MyColors.myBlue,
        opacity: 0.7
    },
    staticButtonImageStyle: {
        height: 30,
        width: 30
    },
    staticButtonTouchableStyle: {
        flex: 1,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    staticButtonTextStyle: {
        fontSize: 9,
        fontWeight: '200',
        color: '#fff',
        alignSelf: 'center'
    }
});

const mapStateToProps = (state) => (
	{
		currentUser: state.profile.currentUser,
	}
)

export default connect(mapStateToProps, profileActions)(Profile);

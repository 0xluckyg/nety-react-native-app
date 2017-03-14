import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	Switch,
	Image
} from 'react-native';

import {MyColors} from '../../helper/style';
import {FacebookThumbnailImage, LinkedInThumbnailImage} from '../../images/images'

class Settings extends Component {

    constructor(props) {
        super(props);

		this.renderWhiteComponent = this.renderWhiteContainer.bind(this);
		this.renderGrayComponent = this.renderGrayContainer.bind(this);

		this.state = {
			switchValue:true
		}
    }

	renderWhiteContainer(text, borderTop, borderBottom, isSwitch, image, imageColor, callback) {
		const renderSwitch = () => {
			if (isSwitch){
				return <Switch
						style={styles.switchStyle}
						onTintColor={MyColors.myBlue}
						value={this.state.switchValue}/>
			}
		}

		const renderImage = () => {
			if (image !== undefined) {
				const thumbnailStyle = {
					resizeMode: 'contain',
					marginLeft: 15,
					height: 30,
					width: 30,
					tintColor: imageColor
				}
				return <Image style={thumbnailStyle} source={image}/>
			}
		}

		return (
			<View
				style={styles.whiteContainerStyle}
				borderTopWidth={borderTop}
				borderBottomWidth={borderBottom}>
				<View style={styles.whiteContainerRowStyle}>
					<View style={styles.whiteContainerRowLeftStyle}>
						{renderImage()}
						<Text style={styles.whiteContainerTextStyle}>{text}</Text>
					</View>
					{renderSwitch()}
				</View>
			</View>
		)
	}

	renderGrayContainer(text) {
		return (
			<View style={styles.grayContainerStyle}>
				<Text style={styles.grayContainerTextStyle}>{text}</Text>
			</View>
		)
	}



    render() {
		const b = 0.5

        return (
            <ScrollView style={styles.containerStyle}>
				{this.renderGrayContainer()}
				{this.renderGrayContainer('SECURITY SETTINGS')}
				{this.renderWhiteContainer('I am discoverable', b, null, true)}
				{this.renderWhiteContainer('Allow people to send me chats', b, b, true)}
				{this.renderGrayContainer()}
				{this.renderGrayContainer('NOTIFICATIONS')}
				{this.renderWhiteContainer('Chat notifications', b, b, true)}
				{this.renderGrayContainer()}
				{this.renderGrayContainer('FRIENDS')}
				{this.renderWhiteContainer('Blocked', b, b)}
				{this.renderGrayContainer()}
				{this.renderGrayContainer('SHARE')}
				{this.renderWhiteContainer('Share on Facebook!', b, null, false, FacebookThumbnailImage, MyColors.facebookColor)}
				{this.renderWhiteContainer('Share on Linkedin!', b, b, false, LinkedInThumbnailImage, MyColors.linkedInColor)}
				{this.renderGrayContainer()}
				{this.renderGrayContainer('ACCOUNT')}
				{this.renderWhiteContainer('Log out', b, b)}
				{this.renderGrayContainer()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
		backgroundColor: MyColors.myLightGray
    },
	grayContainerStyle: {
		justifyContent: 'center',
		height: 30,
		backgroundColor: MyColors.myLightGray
	},
	whiteContainerStyle: {
		borderTopColor: MyColors.myGray,
		borderBottomColor: MyColors.myGray,
		justifyContent: 'center',
		height: 45,
		backgroundColor: '#fff'
	},
	whiteContainerRowStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	whiteContainerRowLeftStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignSelf: 'center'
	},
	whiteContainerTextStyle: {
		alignSelf: 'center',
		paddingLeft: 15,
		fontWeight: '200',
		fontSize: 14
	},
	grayContainerTextStyle: {
		paddingLeft: 15,
		fontWeight: '200',
		fontSize: 10
	},
	switchStyle: {
		marginRight: 10
	}
});

export default Settings;

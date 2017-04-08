import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	ScrollView,
	Image,
	Button
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {MyColors} from '../../../helper/style'
import {AddButtonImage} from '../../../images/images';

import { connect } from 'react-redux';
import * as profileActions from '../../../actions/profileActions';

class Edit extends Component {

    constructor(props) {
        super(props);

		this.state = {
			user: this.props.user
		}

		this.renderTitle = this.renderTitle.bind(this)
		this.renderInputCell = this.renderInputCell.bind(this)
		this.renderLine = this.renderLine.bind(this)
		this.renderShortLine = this.renderShortLine.bind(this)
		this.renderExperience = this.renderExperience.bind(this)
		this.renderExperiences = this.renderExperiences.bind(this)
    }

	renderExperiences() {			
		return (
			<View>
				{this.state.user.experiences
					.map(experience => this.renderExperience(this.state.user.experiences.indexOf(experience), experience))}
			</View>
		)
	}

	renderExperience(key, experience) {
		return (
			<View key={key}>
				{this.renderInputCell(true, 'Name', 'ex. Product manager at Facebook', experience.name)}
				{this.renderInputCell(true, 'Starting date', 'ex.02/11/2016', experience.start)}
				{this.renderInputCell(true, 'End date', 'Present', experience.end)}
				{this.renderInputCell(false, 'Description', 'I worked as a product manager at Facebook', experience.description)}
				<TouchableOpacity>
					<Text style={styles.deleteButtonTextStyle}>Delete</Text>
				</TouchableOpacity>
				{this.renderShortLine()}
			</View>
		)
	}

	renderShortLine() {
		return (
			<View style={styles.shortLineStyle}></View>
		)
	}

	renderLine() {
		return (
			<View style={styles.lineStyle}></View>
		)
	}

	renderTitle(text, image) {
		return(
			<View style={styles.titleViewStyle}>
				<Text style={styles.titleStyle}>{text}</Text>
				<TouchableOpacity style={styles.titleButtonStyle}>
					<Image style={styles.titleImageStyle} source={image}></Image>
				</TouchableOpacity>
			</View>
		)
	}

	fieldValueDidChange(title) {
		return function(value) {
			let user = this.state.user
			switch (title) {
				case "Status":
					user.status = value
					break
				case "Bio":
					user.bio = value
					break
				case "Age":
					user.about.age = Number(value) || user.age
					break
				case "Education":
					user.about.school = value
					break
				case "Profession":
					user.about.profession = value
					break
				case "Work":
					user.about.job = value
					break
				default:
					break
			}
			console.log("12345")
			console.log(user)
			this.setState({ user })
		}.bind(this)
	}

	valueForField(title) {
		let user = this.state.user
		switch (title) {
			case "Status":
				return user.status
			case "Bio":
				return user.bio
			case "Age":
				return user.about.age.toString()
			case "Education":
				return user.about.school
			case "Profession":
				return user.about.profession
			case "Work":
				return user.about.job
			default:
				break
		}
	}

	renderInputCell(collapse, title, placeholder, value) {

		let valueDidChange = this.fieldValueDidChange(title)

		let userValue = this.valueForField(title)
		if (collapse) {
			return (
				<View style={styles.cellCollapseStyle}>
					<Text style={styles.cellTitleCollapseStyle}>{title}</Text>
					<TextInput value={userValue || value} style={styles.cellTextInputCollapseStyle} placeholder={placeholder} onChangeText={valueDidChange}></TextInput>
				</View>
			)
		} else {
			return (
				<View style={styles.cellStyle}>
					<TextInput value={userValue || value} multiline={true} style={styles.cellTextInputStyle} placeholder={placeholder} onChangeText={valueDidChange}></TextInput>
				</View>
			)
		}
	}
	
	onChangeText() {

	}

    render() {
		let user = this.state.user
		let about = user.about

        return (
			<View style={styles.containerStyle}>
				<ScrollView>
					{this.renderTitle("Status")}
					{this.renderInputCell(false, 'Status', 'ex.I have a cool project idea, and I am looking for a business partner ', user.status)}
					{this.renderLine()}
					{this.renderTitle("About me")}
					{this.renderInputCell(true, 'Bio', 'I am a passionate hardworking person that does yoga.', user.bio)}
					{this.renderInputCell(true, 'Age', 'ex.35', about.age.toString())}
					{this.renderInputCell(true, 'Education', 'ex.Nety College', about.school)}
					{this.renderInputCell(true, 'Profession', 'ex.Software engineering', about.profession)}
					{this.renderInputCell(true, 'Work', 'ex.Backend engineer at Nety', about.job)}
					{this.renderLine()}
					{this.renderTitle("Experiences", AddButtonImage)}
					{this.renderExperiences()}
				</ScrollView>
				<TouchableOpacity onPress={() => {
						this.props.setCurrentUser(this.state.user)
						Actions.pop({refresh: {test: true}})
					}} style={styles.buttonStyle}>
					<Text style={styles.buttonTextStyle}>Save</Text>
				</TouchableOpacity>
			</View>
        );
    }
}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		marginTop: 10
	},
	titleViewStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent:'space-between',
	},
	titleStyle: {
		alignSelf: 'center',
		marginLeft: 15,
		marginTop: 10,
		marginBottom: 7,
		fontWeight: '400',
		fontSize: 18,
		color: MyColors.myGray
	},
	titleImageStyle: {
		alignSelf: 'center',
		marginRight: 15,
		height: 30,
		width: 30,
		tintColor: MyColors.myBlue,
	},
	titleButtonStyle: {
		alignSelf: 'center'
	},
	cellStyle: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		marginBottom: 5,
		borderWidth: 0.7,
        borderColor: MyColors.myMediumGray,
		borderRadius: 3
	},
	cellTextInputStyle: {
		height: 50,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		marginBottom: 5,
		borderRadius: 3,
		fontWeight: '200',
		fontSize: 15
	},
	cellCollapseStyle: {
		flexDirection: 'row',
		flex: 1,
		height: 35,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		marginBottom: 5,
		borderWidth: 0.7,
		borderColor: MyColors.myMediumGray,
		borderRadius: 3
	},
	cellTitleCollapseStyle: {
		alignSelf: 'center',
		marginLeft: 15,
		flex: 1,
		fontWeight: '400',
		fontSize: 15,
		color: MyColors.myGray
	},
	cellTextInputCollapseStyle: {
		flex: 2,
		fontWeight: '200',
		fontSize: 15
	},
	lineStyle: {
		height: 1,
		marginTop: 15,
		marginBottom: 15,
		borderTopWidth: 1,
        borderTopColor: MyColors.myMediumGray,
	},
	shortLineStyle: {
		alignSelf: 'center',
		height: 1,
		width: 200,
		marginTop: 15,
		marginBottom: 15,
		borderTopWidth: 1,
        borderTopColor: MyColors.myMediumGray,
	},
	buttonStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		backgroundColor: MyColors.myBlue
	},
	buttonTextStyle: {
		fontWeight: '300',
		fontSize: 16,
		color: '#fff'
	},
	deleteButtonTextStyle: {
		alignSelf: 'flex-end',
		marginTop: 5,
		marginBottom: 5,
		marginRight: 15,
		fontSize: 15,
		color: MyColors.myBlue,
	}
})



export default connect((state) => ({}), profileActions)(Edit);

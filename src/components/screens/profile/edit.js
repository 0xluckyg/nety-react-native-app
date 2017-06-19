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
			user: this.props.self
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

	removeExperience(key) {
		return function() {
			let user = this.state.user
			user.experiences.splice(key, 1)
			this.setState({ user })
		}.bind(this)
	}

	renderExperience(key, experience) {
		return (
			<View key={key}>
				{this.renderInputCell(true, 'Name', 'ex. Product manager at Facebook', experience.name, key)}
				{this.renderInputCell(true, 'Starting date', 'ex.02/11/2016', experience.start, key)}
				{this.renderInputCell(true, 'End date', 'Present', experience.end, key)}
				{this.renderInputCell(false, 'Description', 'Add a description!', experience.description, key)}
				<TouchableOpacity onPress={this.removeExperience(key)}>
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

	addExperience() {
		let blankExperience = {
			name: '',
			description: '',
			start: '',
			end: ''
		}
		let user = this.state.user
		user.experiences.push(blankExperience)
		this.setState({ user })
	}

	renderTitle(text, image) {
		return(
			<View style={styles.titleViewStyle}>
				<Text style={styles.titleStyle}>{text}</Text>
				<TouchableOpacity style={styles.titleButtonStyle} onPress={this.addExperience.bind(this)}>
					<Image style={styles.titleImageStyle} source={image}></Image>
				</TouchableOpacity>
			</View>
		)
	}

	// FIXME: REFACTOR THIS
	fieldValueDidChange(title, index) {
		return function(value) {
			let user = this.state.user
			switch (title) {
				case "Status":
					user.status = value
					break
				case "Bio":
					user.summary = value
					break				
				case "Education":
					user.school = value
					break
				case "Profession":
					user.profession = value
					break
				case "Work":
					user.work = value
					break
				case "Name":
					user.experiences[index].name = value
					break
				case "Starting date":
					user.experiences[index].start = value
					break
				case "End date":
					user.experiences[index].end = value
					break
				case "Description":
					user.experiences[index].description = value
					break
				default:
					break
			}
			this.setState({ user })
		}.bind(this)
	}

	// FIXME: REFACTOR THIS
	valueForField(title, index) {
		let user = this.state.user
		switch (title) {
			case "Status":
				return user.status
			case "Bio":
				return user.summary			
			case "Education":
				return user.education
			case "Profession":
				return user.profession
			case "Work":
				return user.work
			case "Name":
				return user.experiences[index].name
			case "Starting date":
				return user.experiences[index].start
			case "End date":
				return user.experiences[index].end
			case "Description":
				return user.experiences[index].description
			default:
				break
		}
	}

	renderInputCell(collapse, title, placeholder, value, index) {

		let valueDidChange = this.fieldValueDidChange(title, index)

		let userValue = this.valueForField(title, index)
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

	experienceIsValid(experience) {
		return experience.name != "" && 
			experience.description != "" &&
			experience.start != "" &&
			experience.end != ""
	}

	// TODO: Error Handling. Currently removing all invalid experiences. Should highlight them instead.
	saveButtonPressed() {
		let user = this.state.user
		user.experiences = user.experiences.filter( (exp) => this.experienceIsValid(exp) )
		this.setState({ user })
		this.props.setCurrentUser(this.state.user)
		Actions.pop({refresh: {test: true}})
	}

    render() {
		let user = this.state.user		

        return (
			<View style={styles.containerStyle}>
				<ScrollView>
					{this.renderTitle("Status")}
					{this.renderInputCell(false, 'Status', 'ex.I have a cool project idea, and I am looking for a business partner ', user.status)}
					{this.renderLine()}
					{this.renderTitle("About me")}
					{this.renderInputCell(true, 'Bio', 'I am a passionate hardworking person that does yoga.', user.summary)}	
					{this.renderInputCell(true, 'Education', 'ex.Nety College', user.school)}
					{this.renderInputCell(true, 'Profession', 'ex.Software engineering', user.profession)}
					{this.renderInputCell(true, 'Work', 'ex.Backend engineer at Nety', user.work)}
					{this.renderLine()}
					{this.renderTitle("Experiences", AddButtonImage)}
					{this.renderExperiences()}
				</ScrollView>
				<TouchableOpacity onPress={this.saveButtonPressed.bind(this)} style={styles.buttonStyle}>
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

const mapStateToProps = (state) => (
	{
		self: state.profile.self
	}
)

export default connect(mapStateToProps, profileActions)(Edit);

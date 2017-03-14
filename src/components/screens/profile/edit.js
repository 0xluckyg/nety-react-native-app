import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	ScrollView
} from 'react-native';

import {MyColors} from '../../../helper/style'

class Edit extends Component {

    constructor(props) {
        super(props);

		this.state = {
			experiences: [
				{
		            name: 'Software Engineer at Nety',
		            description: 'I worked as an app developer awoeifjaowiejfo awoifjaow awo ije foawij oaiwejf oaiwej foijaw oefijawe ',
		            start: 'Mar 10, 16',
		            end: 'Mar 10, 17'
		        },
				{
		            name: 'Software Engineer at Nety',
		            description: 'I worked as an app developer awoeifjaowiejfo awoifjaow awo ije foawij oaiwejf oaiwej foijaw oefijawe ',
		            start: 'Mar 10, 16',
		            end: 'Mar 10, 17'
		        },
				{
		            name: 'Software Engineer at Nety',
		            description: 'I worked as an app developer awoeifjaowiejfo awoifjaow awo ije foawij oaiwejf oaiwej foijaw oefijawe ',
		            start: 'Mar 10, 16',
		            end: 'Mar 10, 17'
		        }
			]
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
				{this.state.experiences.map(experience => {
					return this.renderExperience(this.state.experiences.indexOf(experience), experience)
				})}
			</View>
		)
	}

	renderExperience(key, experience) {
		return (
			<View key={key}>
				{this.renderInputCell(true, 'Name', 'ex.Product manager at Facebook', experience.name)}
				{this.renderInputCell(true, 'Starting date', 'ex.02/11/2016', experience.start)}
				{this.renderInputCell(true, 'End date', 'Present', experience.end)}
				{this.renderInputCell(false, 'Description', 'I worked as a product manager at Facebook', experience.description)}
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

	renderTitle(text) {
		return(
			<Text style={styles.titleStyle}>{text}</Text>
		)
	}

	renderInputCell(collapse, title, placeholder, value) {
		if (collapse) {
			return (
				<View style={styles.cellCollapseStyle}>
					<Text style={styles.cellTitleCollapseStyle}>{title}</Text>
					<TextInput value={value} style={styles.cellTextInputCollapseStyle} placeholder={placeholder}></TextInput>
				</View>
			)
		} else {
			return (
				<View style={styles.cellStyle}>
					<TextInput value={value} multiline={true} style={styles.cellTextInputStyle} placeholder={placeholder}></TextInput>
				</View>
			)
		}
	}

    render() {
        return (
			<View style={styles.containerStyle}>
				<ScrollView>
					{this.renderTitle("Status")}
					{this.renderInputCell(false, 'Status', 'ex.I have a cool project idea, and I am looking for a business partner ')}
					{this.renderLine()}
					{this.renderTitle("About me")}
					{this.renderInputCell(true, 'Age', 'ex.35')}
					{this.renderInputCell(true, 'Education', 'ex.Nety College')}
					{this.renderInputCell(true, 'Profession', 'ex.Software engineering')}
					{this.renderInputCell(true, 'Work', 'ex.Backend engineer at Nety')}
					{this.renderLine()}
					{this.renderTitle("Experiences")}
					{this.renderExperiences()}
				</ScrollView>
				<TouchableOpacity style={styles.buttonStyle}>
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
	titleStyle: {
		marginLeft: 15,
		marginTop: 10,
		marginBottom: 7,
		fontWeight: '400',
		fontSize: 12,
		color: MyColors.myGray
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
	}
})

export default Edit;

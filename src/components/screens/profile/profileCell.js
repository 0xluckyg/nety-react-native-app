import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {MyColors} from '../../../helper/style';

class ProfileCell extends Component {

    constructor(props) {
        super(props)

        this.status = this.status.bind(this);
        this.about = this.about.bind(this);
        this.experiences = this.experiences.bind(this);
        this.experienceCell = this.experienceCell.bind(this);
        this.header = this.header.bind(this);
    }

    status(text) {
        return (
            <View>
                {this.header("Status")}
                <View style={styles.statusViewStyle}>
                    <Text style={styles.statusStyle}>{text}</Text>
                </View>
            </View>
        )
    }

    about(about) {
        return (
            <View>
                {this.header("About")}
                <View style={styles.viewStyle}>
                    <View style={styles.aboutCellStyle}>
                        <Text style={styles.aboutKeyStyle}>Age</Text>
                        <Text style={styles.aboutValueStyle}>I am </Text>
                        <Text style={styles.aboutValueSpecialStyle}>{about.age}</Text>
                    </View>
                    <View style={styles.aboutCellStyle}>
                        <Text style={styles.aboutKeyStyle}>School</Text>
                        <Text style={styles.aboutValueStyle}>I went to </Text>
                        <Text style={styles.aboutValueSpecialStyle}>{about.school}</Text>
                    </View>
                    <View style={styles.aboutCellStyle}>
                        <Text style={styles.aboutKeyStyle}>Profession</Text>
                        <Text style={styles.aboutValueStyle}>I specialize in </Text>
                        <Text style={styles.aboutValueSpecialStyle}>{about.profession}</Text>
                    </View>
                    <View style={styles.aboutCellStyle}>
                        <Text style={styles.aboutKeyStyle}>Job</Text>
                        <Text style={styles.aboutValueStyle}>I work at </Text>
                        <Text style={styles.aboutValueSpecialStyle}>{about.job}</Text>
                    </View>
                </View>
            </View>
        )
    }

    experiences(experiences) {
        return (
            <View>
                {this.header("Experience")}
                <View style={styles.experienceViewStyle}>
                    {experiences.map(experience => {
                        return this.experienceCell(experience)
                    })}
                </View>
            </View>
        )
    }

    experienceCell(experience) {
        return (
            <View style={styles.experienceCellStyle} key={experience.name}>
                <View style={styles.experienceCellTopViewStyle}>
                    <Text style={styles.experienceCellNameStyle}>{experience.name}</Text>
                    <View style={styles.experienceCellDateViewStyle}>
                        <Text style={styles.experienceCellDateStyle}>{experience.start}</Text>
                        <Text style={styles.experienceCellDateStyle}> ~ {experience.end}</Text>
                    </View>
                </View>
                <Text style={styles.experienceCellDescriptionStyle}>{experience.description}</Text>
            </View>
        )
    }

    header(description) {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{description}</Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.status(this.props.data.status)}
                {this.about(this.props.data.about)}
                {this.experiences(this.props.data.experiences)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        height: 35,
        borderTopWidth: 0.5,
        borderTopColor: MyColors.myGray,
        borderBottomWidth: 0.5,
        borderBottomColor: MyColors.myGray
    },
    headerText: {
        paddingLeft: 25,
        color: MyColors.myBlue,
        fontWeight: '400'
    },
    viewStyle: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 30,
        paddingBottom: 30
    },
    aboutCellStyle: {
        flexDirection: 'row',
        paddingTop: 7,
        paddingBottom: 7
    },
    statusViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 30,
        paddingBottom: 30
    },
    statusStyle: {
        fontWeight: '300',
        color: MyColors.myGray
    },
    aboutKeyStyle: {
        width: 100,
        fontWeight: '400'
    },
    aboutValueStyle: {
        fontWeight: '300',
        color: MyColors.myGray
    },
    aboutValueSpecialStyle: {
        fontWeight: '300',
        color: MyColors.myBlue
    },
    experienceViewStyle: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 20,
        paddingBottom: 50
    },
    experienceCellStyle: {
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: MyColors.myGray
    },
    experienceCellTopViewStyle: {
        justifyContent:'space-between',
        flexDirection: 'row',
        paddingBottom: 10
    },
    experienceCellNameStyle: {

    },
    experienceCellDateViewStyle: {
        flexDirection: 'row'
    },
    experienceCellDateStyle: {
        fontWeight: '200',
        fontSize: 10,
        color: MyColors.myBlue
    },
    experienceCellDescriptionStyle: {
        fontWeight: '300',
        color: MyColors.myGray

    }
});

export default ProfileCell;

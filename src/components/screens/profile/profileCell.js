import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';

import {MyColors} from '../../../helper/style';

class ProfileCell extends Component {

    constructor(props) {
        super(props)
        this.status = this.status.bind(this);
        this.bio = this.bio.bind(this);
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
                    <Text style={styles.statusStyle}>{text || 'No Status'}</Text>
                </View>
            </View>
        )
    }
    bio(text) {
        return (
            <View>
                {this.header("Bio")}
                <View style={styles.statusViewStyle}>
                    <Text style={styles.statusStyle}>{text || 'No Bio'}</Text>
                </View>
            </View>
        )
    }

    about(about) {        
        return (
            <View>
                {this.header("About")}
                {!about.education && !about.profession && !about.work ?
                    <View style={styles.statusViewStyle}>
                        <Text style={styles.statusStyle}>No Information</Text>
                    </View> :                    
                    <View style={styles.viewStyle}>                        
                        {about.profession ? <View style={styles.aboutCellStyle}>
                            <Text style={styles.aboutKeyStyle}>Profession</Text>
                            <Text style={styles.aboutValueStyle}>I specialize in </Text>
                            <Text style={styles.aboutValueSpecialStyle}>{about.profession}</Text>
                        </View> : null}
                        {about.work ? <View style={styles.aboutCellStyle}>
                            <Text style={styles.aboutKeyStyle}>Job</Text>
                            <Text style={styles.aboutValueStyle}>I work at </Text>
                            <Text style={styles.aboutValueSpecialStyle}>{about.work}</Text>
                        </View> : null}      
                        {about.education ? <View style={styles.aboutCellStyle}>
                            <Text style={styles.aboutKeyStyle}>School</Text>                        
                            <Text style={styles.aboutValueStyle}>I went to </Text>
                            <Text style={styles.aboutValueSpecialStyle}>{about.education}</Text>
                        </View> : null}              
                    </View>
                }
            </View>
        )
    }

    experiences(experiences) {        
        let experienceView;

        if (!experiences || experiences.length < 1) {
            experienceView = 
                <View style={styles.statusViewStyle}>                          
                    <Text style={styles.statusStyle}>No Experiences</Text>
                </View>
        } else {
            experienceView = experiences.map(experience => {
                return this.experienceCell(experience)
            });
        }
        return (
            <View style={styles.experienceContainer}>
                {this.header("Experience")}                     
                {experienceView}
            </View>
        )
    }

    experienceCell(experience) {
        const start = moment(experience.start).format("MMM Do YY"); 
		const end = moment(experience.end).format("MMM Do YY"); 
        return (
            <View style={styles.experienceCellStyle} key={experience.name}>
                <View style={styles.experienceCellTopViewStyle}>
                    <Text style={styles.experienceCellNameStyle}>{experience.name}</Text>
                    <View style={styles.experienceCellDateViewStyle}>
                        <Text style={styles.experienceCellDateStyle}>{start}</Text>
                        <Text style={styles.experienceCellDateStyle}> ~ {end}</Text>
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
            <View styles={styles.container}>
                {this.status(this.props.data.status)}
                {this.bio(this.props.data.summary)}
                {this.about(this.props.data)}
                {this.experiences(this.props.data.experiences)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    experienceContainer: {
        marginBottom: 50
    },
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
        fontWeight: '400',
        fontSize: 15,
    },
    viewStyle: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 30,
        paddingBottom: 30
    },
    aboutCellStyle: {
        width: 135,
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
        paddingBottom: 30,    
    },
    statusStyle: {
        fontWeight: '300',
        fontSize: 15,
        color: MyColors.myGray
    },
    aboutKeyStyle: {
        width: 100,
        fontWeight: '400',
        fontSize: 15,
    },
    aboutValueStyle: {
        fontWeight: '300',
        fontSize: 15,
        color: MyColors.myGray
    },
    aboutValueSpecialStyle: {
        fontWeight: '300',
        fontSize: 15,
        color: MyColors.myBlue
    },
    experienceViewStyle: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 20,
        paddingBottom: 90
    },
    experienceCellStyle: {
        marginLeft: 25,
        marginRight: 25,
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
        width: 170,
        fontSize: 15,
        fontWeight: '400'
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
        fontSize: 15,
        color: MyColors.myGray

    }
});

export default ProfileCell;

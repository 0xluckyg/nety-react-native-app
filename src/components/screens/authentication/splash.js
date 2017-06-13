import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {MyColors} from '../../../helper/style';
import Form from '../../../helper/Formula';
import {FacebookThumbnailImage, LinkedInThumbnailImage} from '../../../images/images'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default class Splash extends Component {
    constructor() {
        super()
        this.state = {
            values: {}
        }
    }


    render() {
        const { 
            backgroundImage, 
            icon,             
            center, 
            bottom, 
            button, 
            buttonBlue, 
            buttonText, 
            overlay,                       
            half,
            createAccount,
            oAuth,
            facebook,
            linkedin,
            thumbnailStyle
        } = styles

        const structure = {
            config: {
                fieldStyle: styles.field,
                containerStyle: styles.fieldContainer,
                placeholderColor: 'lightgray',
                errorStyle: {},
                errorTextStyle: styles.errorTextStyle
            },
            fields: [
                {
                    name: 'email',
                    placeholder: 'Email',
                    keyboardType: 'email-address',
                },
                {
                    name: 'password',
                    placeholder: 'Password',                    
                    secureTextEntry: true
                }
            ]
        }
        
        return (
                <Image
                    source={require('../../../images/mock/Background1.png')}
                    style={styles.backgroundImage}
                >
                    <View style={overlay}>
                        <View style={[half, center]}>
                            <Image
                                source={require('../../../images/LogoTransparent.png')}
                                style={styles.icon}
                            />
                        </View>

                        <View style={center}>
                            <Form formula={structure} values={this.state.values} onChange={values => this.setState(values)} />
                            <TouchableOpacity
                                onPress={() => Actions.tabBar({type: 'replace'})}
                                style={[button, center]}
                            >
                                <Text style={buttonText}>Login!</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[half, bottom]}>
                            <TouchableOpacity
                                onPress={() => Actions.signup()}
                                style={[center, createAccount]}
                            >
                                <Text style={buttonText}>Create account?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {}}
                                style={[oAuth, facebook, center]}
                            >
                                <Image style={thumbnailStyle} source={FacebookThumbnailImage}/>
                                <Text style={buttonText}>Facebook</Text>
                            </TouchableOpacity>                            
                            <TouchableOpacity
                                onPress={() => {}}
                                style={[oAuth, linkedin, center]}
                            >
                                <Image style={thumbnailStyle} source={LinkedInThumbnailImage}/>
                                <Text style={buttonText}>Linkedin</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    overlay: {
        height: screenHeight,
        width: screenWidth,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    icon: {
        width: screenWidth / 3.5,
        height: screenWidth / 3.5
    },
    title: {
        color: 'white'
    },
    half: {
        flex: 1
    },
    field: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontColor: 'white',
        marginLeft: 10,
        height: 40,
        color: 'white'
    },
    fieldContainer: {
        alignSelf: 'center',
        width: screenWidth * 0.7,
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        marginBottom: 10
    },
    errorTextStyle: {       
        width: screenWidth * 0.7,        
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        color: 'white',
        paddingTop: 30                                    
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    button: {
        width: screenWidth * 0.4,
        height: 40,        
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: 16,
    },
    buttonBlue: {
        backgroundColor: MyColors.myBlue
    },
    createAccount: {
        paddingBottom: 25
    },
    oAuth: {
        flexDirection: 'row',
        width: screenWidth,
        height: 44
    },
    linkedin: {
        backgroundColor: MyColors.linkedInColor
    },
    facebook:{
        backgroundColor: MyColors.facebookColor
    },
    thumbnailStyle: {
        resizeMode: 'contain',
        marginRight: 15,        
        height: 25,
        width: 25,
        tintColor: 'white'
    }
})
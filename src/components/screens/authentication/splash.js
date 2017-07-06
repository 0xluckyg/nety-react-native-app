import React, { Component } from 'react'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {MyColors} from '../../../helper/style';
import Form from './form';
import {FacebookThumbnailImage, LinkedInThumbnailImage} from '../../../images/images'
import * as authActions from '../../../actions/authActions';
import { connect } from 'react-redux';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class Splash extends Component {
    constructor() {
        super()
        this.state = {
            values: {}
        }
        this.login = this.login.bind(this);
    }

    login() {
        this.props.signInUser(this.state.values);        
    }

    render() {
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
            <KeyboardAvoidingView
                behavior='padding'
                style={styles.avoidingView}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Image
                        source={require('../../../images/mock/Background1.png')}
                        style={styles.backgroundImage}
                    >
                        <View style={styles.overlay}>
                            <View style={[styles.half, styles.center]}>
                                <Image
                                    source={require('../../../images/LogoTransparent.png')}
                                    style={styles.icon}
                                />
                            </View>

                            <View style={styles.center}>
                                <Form formula={structure} values={this.state.values} onChange={values => this.setState(values)} />
                                <TouchableOpacity
                                    onPress={() => this.login()}
                                    style={[styles.button, styles.center]}
                                >
                                    <Text style={styles.buttonText}>Login!</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.half, styles.bottom]}>
                                <TouchableOpacity
                                    onPress={() => Actions.signup()}
                                    style={[styles.center, styles.createAccount]}
                                >
                                    <Text style={styles.buttonText}>Create account?</Text>
                                </TouchableOpacity>
                                {/*<TouchableOpacity
                                    onPress={() => {}}
                                    style={[styles.oAuth, styles.facebook, styles.center]}
                                >
                                    <Image style={styles.thumbnailStyle} source={FacebookThumbnailImage}/>
                                    <Text style={styles.buttonText}>Facebook</Text>
                                </TouchableOpacity>                            
                                <TouchableOpacity
                                    onPress={() => {}}
                                    style={[styles.oAuth, styles.linkedin, styles.center]}
                                >
                                    <Image style={styles.thumbnailStyle} source={LinkedInThumbnailImage}/>
                                    <Text style={styles.buttonText}>Linkedin</Text>
                                </TouchableOpacity>*/}
                            </View>
                        </View>                   
                    </Image>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    avoidingView: {
        flex: 1
    },
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

export default connect(null, authActions)(Splash);
import React, { Component } from 'react'
import { View, Keyboard, KeyboardAvoidingView, Text, TouchableOpacity, TouchableWithoutFeedback, Image, StyleSheet, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Form from './form';

import * as authActions from '../../../actions/authActions';
import { connect } from 'react-redux';

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

class Signup extends Component {

    constructor() {
        super()

        this.state = {
            values: {}
        }

        this.signup = this.signup.bind(this);
    }

    signup() {            
        const signup = {
            name: {
                first: this.state.values.firstName,
                last: this.state.values.lastName
            },
            email: this.state.values.email,
            password: this.state.values.password
        }

        console.log(this.state.values);

        if (signup.name.first.length > 1 && 
            signup.name.first.length < 20 && 
            signup.name.last.length > 1 && 
            signup.name.last.length < 20 &&
            signup.email.length > 7 &&
            signup.password.length > 7 &&
            signup.password === this.state.values.passwordConfirmation) {                
                this.props.signUpUser(signup);
            }
    }

    render() {
        const validations = {
            firstName: [
                {
                predicate: value => value.length > 1 && value.length < 20,
                message: 'Please provide a valid name'
                }
            ],
            lastName: [
                {
                predicate: value => value.length > 1 && value.length < 20,
                message: 'Please provide a valid name'
                }
            ],
            email: [
                {
                predicate: value => value.length > 7,
                message: 'Incorrect Email Format!'
                }
            ],
            password: [
                {
                predicate: value => value.length > 7,
                message: 'Password must have a minimum of 8 characters'
                }
            ]
        }

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
                    name: 'firstName',
                    placeholder: 'Firstname',
                    autoCapitalize: 'words',
                    validations: validations.firstName
                },
                {
                    name: 'lastName',
                    placeholder: 'Lastname',
                    autoCapitalize: 'words',
                    validations: validations.lastName
                },
                {
                    name: 'email',
                    placeholder: 'Email',
                    keyboardType: 'email-address',
                    validations: validations.email
                },
                {
                    name: 'password',
                    placeholder: 'Password',
                    confirmable: true,
                    validations: validations.password,
                    secureTextEntry: true
                },
                {
                    name: 'passwordConfirmation',
                    placeholder: 'Confirm Password',                    
                    secureTextEntry: true
                }
            ]
        }

        const { 
            avoidingView,
            backgroundImage, 
            icon, 
            half, 
            center, 
            bottom, 
            button,             
            buttonText, 
            overlay, 
            paddingBottom25 
        } = styles
        
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
                        <View style={[styles.overlay, styles.center]}>
                            <Form formula={structure} values={this.state.values} onChange={values => this.setState(values)} />
                            <TouchableOpacity
                                onPress={() => this.signup()} 
                                style={[styles.button, styles.center]}
                            >
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
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
        width: screenWidth / 3,
        height: screenWidth / 3
    },
    title: {
        color: 'white'
    },
    half: {
        flex: 1
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
        height: 44,        
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: 16,
    },    
    paddingBottom25: {
        paddingBottom: 25
    },
    field: {        
        fontFamily: 'Avenir',
        fontSize: 16,
        fontColor: 'white',
        marginLeft: 10,
        height: 44,
        color: 'white'
    },
    fieldContainer: {
        alignSelf: 'center',
        width: screenWidth * 0.7,
        height: 44,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        marginBottom: 10
    },
    errorTextStyle: {        
        width: screenWidth * 0.7,        
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 16,
        color: 'white',
        paddingTop: 30                    
    }
})

export default connect(null, authActions)(Signup);
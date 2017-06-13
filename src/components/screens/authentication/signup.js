import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Form from '../../../helper/Formula'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default class Signup extends Component {

    constructor() {
        super()

        this.state = {
            values: {}
        }
    }


    render() {
        const validations = {
            email: [
                {
                predicate: value => value.length > 7,
                message: 'Incorrect Email Format!'
                }
            ],
            password: [
                {
                predicate: value => value.length > 7,
                message: 'Password must have a minimum of 8 character'
                }
            ]
        }

        const structure = {
            config: {
                fieldStyle: styles.field,
                containerStyle: styles.fieldContainer,
                placeholderColor: 'lightgray',
                // errorStyle: {borderBottomWidth: 1, borderColor: 'red'}
            },
            fields: [
                {
                    name: 'name',
                    placeholder: 'Name',
                    autoCapitalize: 'words'
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
                    validations: validations.password,
                    secureTextEntry: true
                }
            ]
        }

        const { 
            backgroundImage, 
            icon, 
            half, 
            center, 
            bottom, 
            button, 
            buttonBlue, 
            buttonText, 
            overlay, 
            paddingBottom25 
        } = styles
        return (
                <Image
                    source={require('../../../images/mock/Background1.png')}
                    style={backgroundImage}
                >
                    <View style={[overlay, center]}>
                        <Form formula={structure} values={this.state.values} onChange={values => this.setState(values)} />
                        <TouchableOpacity
                            onPress={() => Actions.tabBar({type: 'replace'})} 
                            style={[button, buttonBlue, center]}
                        >
                            <Text style={buttonText}>Sign Up</Text>
                        </TouchableOpacity>
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
        width: screenWidth * 0.9,
        height: 44,
        borderRadius: screenWidth * 0.9 / 30,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: 16,
    },
    buttonBlue: {
        backgroundColor: 'rgba(0,0,255,0.5)'
    },
    paddingBottom25: {
        paddingBottom: 25
    },
    field: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontColor: 'white',
        marginLeft: 10,
        height: 44,
        color: 'white'
    },
    fieldContainer: {
        width: screenWidth * 0.9,
        height: 44,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        marginBottom: 10
    }
})
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default class Splash extends Component {
    render() {
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
                    <View style={overlay}>
                        <View style={[half, center]}>
                            <Image
                                source={require('../../../images/LogoTransparent.png')}
                                style={icon}
                            />
                        </View>

                        <View style={[half, bottom, paddingBottom25]}>
                            <TouchableOpacity
                                onPress={() => Actions.login()}
                                style={[button, center]}
                            >
                                <Text style={buttonText}>Already have an account?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => Actions.signup()}
                                style={[button, buttonBlue, center]}
                            >
                                <Text style={buttonText}>Get Started?</Text>
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
        marginBottom: 15
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
    }

})
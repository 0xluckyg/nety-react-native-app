import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Dimensions,
    Animated,
    Easing
} from 'react-native';
import {MyColors} from '../../helper/style';

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.spin = this.spin.bind(this);
    }

    componentDidMount() {        
        this.spin();   
    }

    spin() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    render() {
        const window = Dimensions.get('window');        
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <Animated.View style={{
                marginTop: window.height/2 - 35,                
                alignItems: 'center',                
                position: 'absolute',
                alignSelf: 'center',
                width: 70,
                height: 70,                
                zIndex: 999,  
                transform: [{rotate: spin}]
            }}>
                <View style={styles.loaderViewStyle}>
                    <View style={styles.circleStyle}></View>
                    <View style={styles.circleStyle}></View>
                </View>
            </Animated.View>
        )                        
    }
}

const styles = StyleSheet.create({
    loaderViewStyle: {
        flex: 1,        
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    circleStyle: {
        // flex: 1,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: MyColors.myBlue,  
        opacity: 0.7
    }
});

export default Spinner;
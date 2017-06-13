import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Dimensions,
    Animated,
    Easing,
    Image
} from 'react-native';
import {MyColors} from '../../helper/style';
import {CheckmarkImage} from '../../images/images'

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };

        this.visibility = new Animated.Value(this.state.visible ? 0 : 1);
        this.toast = this.toast.bind(this);        
    }

    componentDidMount() {                
        this.toast();
    }

    toast() {        
        Animated.timing(this.visibility, {
            toValue: this.state.visible ? 1 : 0,
            duration: 300,
        }).start(() => {
            setTimeout(() => {
                this.setState({visible: false});
                this.toast();
            }, 500);
        });
    }

    render() {
        const window = Dimensions.get('window');        

        const animation = {
            opacity: this.visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.8],
            }),
            transform: [
                {
                    scale: this.visibility.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.1, 1],
                    }),
                },
            ],
        }
        // const combinedStyle = Object.assign(animation, obj2);

        return (
            <Animated.View style={{     
                position: 'absolute',
                alignSelf: 'center',
                marginTop: window.height/2 - 35,
                zIndex: 999,    
                opacity: this.visibility.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.8],
                }),
                transform: [
                    {
                        scale: this.visibility.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1.1, 1],
                        }),
                    },
                ],
            }}>              
                <View style={styles.circleToast}>
                    <Image style={styles.checkMark} source={CheckmarkImage}></Image>
                </View>
            </Animated.View>
        )                        
    }
}

const styles = StyleSheet.create({
    circleToast: {
        justifyContent: 'center',
        alignItems: 'center',

        width: 70,
        height: 70,

        borderRadius: 35,
        backgroundColor: MyColors.myBlue,   
    }, 
    checkMark: {
        height: 40,
        width: 40,
        color: 'white'
    }
});

export default Toast;
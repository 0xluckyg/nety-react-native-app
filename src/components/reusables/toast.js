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

import * as indicatorActions from '../../actions/indicatorActions';
import { connect } from 'react-redux';

class Toast extends Component {
    constructor(props) {
        super(props);
        
        this.visible = true;
        this.visibility = new Animated.Value(this.visible ? 0 : 1);
        this.toast = this.toast.bind(this);    
    }

    toast(cont) {       
        if (!cont) {
            setTimeout(() => {                
                this.props.showToast(false);                
                this.visible = true;
            }, 500);            
        }

        Animated.timing(this.visibility, {
            toValue: this.visible ? 1 : 0,
            duration: 300,
        }).start(() => {         
            if (this.props.show) {
                setTimeout(() => {         
                    this.visible = false;       
                    this.toast(false);                
                }, 500);
            }            
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
        if (this.props.show) {            
            this.toast(true);

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
        } else {
            return null
        }              
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

const mapStateToProps = (state) => {    
    return {
        show: state.indicator.showToast
    }
}

export default connect(mapStateToProps, indicatorActions)(Toast);
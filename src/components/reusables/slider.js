import React, { Component } from 'react';
import {
	StyleSheet,
	View,
    Dimensions
} from 'react-native';

import Slider from 'react-native-multi-slider';
import {MyColors} from '../../helper/style';

class MySlider extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
			<Slider
                containerStyle={styles.containerStyle}
                sliderLength={Dimensions.get('window').width}
                trackStyle={styles.trackStyle}
                selectedStyle={styles.selectedStyle}
                markerStyle={styles.markerStyle}
                pressedMarkerStyle={styles.pressedMarkerStyle}
				values={[3]}
                thumbStyle={styles.thumbStyle}
				onValuesChange={values => this.props.onValueChange(values[0])} />
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: 34,
        alignItems: 'stretch',
        justifyContent: 'center',
        borderTopWidth: 0.5,
        borderTopColor: MyColors.myGray
    },
    trackStyle: {
        height: 1
    },
    selectedStyle: {
        backgroundColor: '#496592'
    },
    markerStyle: {
        height:24,
        width: 24,
        borderRadius: 12,
        backgroundColor:'#fff',
        borderWidth: 0.25,
        borderColor: MyColors.myGray
    },
    pressedMarkerStyle: {
        backgroundColor:'#fff'
    },
    thumbStyle: {
        top: 22,
        width: 15,
        height: 15,
        backgroundColor: 'white',
        borderColor: MyColors.myBlue,
        borderWidth: 2
    }
})

export default MySlider

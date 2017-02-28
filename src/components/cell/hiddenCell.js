import React, {PropTypes, Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

const HiddenCell = ({type, removeCell, blockCell, secId, rowId, rowMap}) => {

    return(
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={ () => {} }>
                <Text style={styles.backTextWhite}>Block</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={ () => {} }>
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',

        paddingLeft: 15,

        backgroundColor: '#fff'
    },
    backRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',

        bottom: 0,
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        right: 75,

        backgroundColor: '#c6c6c6'
    },
    backRightBtnRight: {
        right: 0,

        backgroundColor: '#dc4437'
    },
    backTextWhite: {
        color: '#fff'
    }
})

export default HiddenCell;

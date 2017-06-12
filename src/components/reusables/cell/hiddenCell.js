import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

import {Block, Leave} from '../../../images/images';

const renderBlockButton= function(blockPressed, deletePressed, data) {
    let overrideStyle =  { right: deletePressed ? 75 : 0}
    if (blockPressed) {
        return (
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft, overrideStyle]}
                onPress={ () => blockPressed([data]) }>
                <Image style={styles.imageStyle} source={Block}/>
                <Text style={styles.backTextWhite}>Block</Text>
            </TouchableOpacity>
        )
    }
}

const renderDeleteButton = function(deletePressed, data) {
    if (deletePressed) {
        return (
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={ () => deletePressed([data]) }>
                <Image style={styles.imageStyle} source={Leave}/>
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        )
    }
}

const HiddenCell = ({blockPressed, deletePressed, data, type, secId, rowId, rowMap}) => {

    return(
        <View style={styles.rowBack}>
            { renderBlockButton(blockPressed, deletePressed, data) }
            { renderDeleteButton(deletePressed, data) }
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
        fontSize: 10,
        paddingTop: 5,
        color: '#fff'
    },
    imageStyle: {
        width:25,
        height:25
    }
})

export default HiddenCell;

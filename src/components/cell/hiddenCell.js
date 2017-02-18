import React, {PropTypes} from 'react';
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
                onPress={ () => blockCell(secId, rowId, rowMap) }>
                <Text style={styles.backTextWhite}>Block</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={ () => removeCell(secId, rowId, rowMap) }>
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: '#c6c6c6',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: '#dc4437',
        right: 0
    },
    backTextWhite: {
        color: '#FFF'
    }
})

export default HiddenCell;

import React, {PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = ({headerText}) => {

    const {fontStyle, headerStyle} = styles;

    return(
        <View style={headerStyle}>
            <Text style={fontStyle}>{headerText}</Text>
         </View>
    )
}

Header.propTypes = {
    headerText:PropTypes.string
}

const styles = StyleSheet.create({
    headerStyle:{
        justifyContent:'center',
        alignItems:'center',
        position:'relative',

        height:60,

        paddingTop:15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#707070',
        backgroundColor:'#fff'
    },
    fontStyle:{
        fontSize: 20,
        fontWeight: '200'
    }
})

export default Header;

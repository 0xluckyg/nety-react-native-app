import React, {PropTypes} from 'react';
import {Text, View} from 'react-native';

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

const styles = {
    headerStyle:{
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        height:60,
        paddingTop:15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#707070',
        elevation: 2,
        position:'relative'

    },
    fontStyle:{
        fontSize: 20,
        fontWeight: '200'
    }
}

export default Header;

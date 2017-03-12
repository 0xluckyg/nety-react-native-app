import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import {Trump} from '../../../images/images';
import {MyColors} from '../../../helper/style';

class Cell extends Component {
    constructor(props) {
        super(props);

        this.renderChatNotifications = this.renderChatNotifications.bind(this);
    }

    renderChatNotifications(isChat) {
        if (isChat) {
            return <Text style={styles.notificationTextStyle}>12</Text>
        }
    }

    render() {
        return (
            <TouchableHighlight
                onPress={ () => Actions.profile() }
                underlayColor={'#ededed'}
            >
                <View style={styles.rowStyle}>
                    <View style={styles.rowImageViewStyle}>
                        <Image style={styles.rowImageStyle} source={Trump}/>
                    </View>
                    <View style={styles.rowContentStyle}>
                        <View>
                            <Text style={styles.topTextStyle}>Donald Trump</Text>
                        </View>
                        <View style={styles.middleContentStyle}>
                            <Text style={styles.middleTextStyle}>Grab them by the pussy!</Text>
                            {this.renderChatNotifications(this.props.isChat)}
                        </View>
                        <View style={styles.bottomContentStyle}>
                            <Text style={styles.bottomTextStyle}>02/20/2017</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: 'row',
        flex: 1,

        height: 81,

        backgroundColor: '#fff'
    },
    rowImageViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',

        marginLeft: 15,
        marginRight: 15
    },
    rowImageStyle: {
        width:60,
        height:60,

        borderRadius: 30
    },
    rowContentStyle: {
        flexDirection: 'column',
        flex: 1,
        justifyContent:'space-around',

        paddingTop: 10,
        paddingBottom: 10
    },
    middleContentStyle: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    bottomContentStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    topTextStyle: {
        fontSize: 13,
        fontWeight: '400'
    },
    middleTextStyle: {
        fontSize: 13,
        fontWeight: '200'
    },
    notificationTextStyle: {
        textAlign: 'center',
        overflow: 'hidden',

        paddingVertical: 3,
        paddingHorizontal: 7,
        width: 30,
        marginRight: 10,

        backgroundColor: MyColors.myBlue,
        borderRadius: 11,
        fontSize: 13,
        fontWeight: '200',
        color: '#fff'
    },
    bottomTextStyle: {
        marginRight: 10,

        fontSize: 10,
        fontWeight: '200'
    }
});

export default Cell;

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';

// import {Trump} from '../../../images/images';
import {MyColors} from '../../../helper/style';
import {DefaultProfilePicture} from '../../../images/images';
import moment from 'moment';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainText: '',
            subText: ''
        }
        this.renderChatNotifications = this.renderChatNotifications.bind(this);
        this.renderMiddleText = this.renderMiddleText.bind(this);        
        this.renderSubText = this.renderSubText.bind(this);
    }

    renderChatNotifications() {
        if (this.props.isChat) {
            if (this.props.data.unread > 0) {
                var reference = moment(this.props.data.updatedAt); // fixed just for testing, use moment();
                var today = reference.clone().startOf('day');
                return <Text style={styles.notificationTextStyle}>{this.props.data.unread}</Text>
            } 
        }
    }

    renderMiddleText() {        
        if (this.props.isChat) {                        
                return this.props.data.lastMessage.text;
        } else {
            if (this.props.data.status) {                                
                return this.props.data.status;
            } else if (this.props.data.summary) {                
                return this.props.data.summary                                 
            } else {                
                return 'No self description'                
            }          
        }
    }

    renderSubText() {
        if (this.props.isChat) {
            return formatDate(this.props.data.updatedAt) 
        } else {
            if (this.props.data.status) {                                
                return this.props.profession || this.props.work || this.props.education || 'No work description'                                
            } else if (this.props.data.summary) {                
                return this.props.profession || this.props.work || this.props.education || 'No work description'                
            } else {                
                return this.props.profession || this.props.work || this.props.education || 'No work description'                
            }
        }

        function formatDate(date) {
            if (!date) {return null}
            var ref = moment();
            var today = ref.clone().startOf('day');        
            var weekAgo = ref.clone().subtract(7, 'days').startOf('day');

            var weekdays = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
            
            function isToday(momentDate) {
                return moment(momentDate).isSame(today, 'd');
            }        
            function isWithinAWeek(momentDate) {
                return moment(momentDate).isAfter(weekAgo);
            }        

            if (isToday(date)) {
                console.log('TODAY');
                return moment(date).locale('en').format("h:mm A") + '';
            } else if (isWithinAWeek(date)) {
                return weekdays[moment(date).isoWeekday() - 1]
            } else {
                return moment(date).format("MMM Do YY") + '';
            }
        }
    }

    render() {        
        return (
            <TouchableHighlight
                onPress={ () => this.props.goToOnPress() }
                underlayColor={'#ededed'}
            >
                <View style={styles.rowStyle}>
                    <View style={styles.rowImageViewStyle}>
                        {this.props.data.imageUrl ? 
                             <Image style={styles.rowImageStyle} source={{uri: this.props.data.imageUrl}}/> :
                             <Image style={styles.rowImageStyle} source={DefaultProfilePicture}/>
                        }                       
                    </View>
                    <View style={styles.rowContentStyle}>
                        <View>
                            <Text style={styles.topTextStyle}>{this.props.data.name.first + " " + this.props.data.name.last}</Text>
                        </View>
                        <View style={styles.middleContentStyle}>
                            <Text style={styles.middleTextStyle}>{this.renderMiddleText()}</Text>
                            {this.renderChatNotifications()}
                        </View>
                        <View style={styles.bottomContentStyle}>
                            <Text style={styles.bottomTextStyle}>{this.renderSubText()}</Text>
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

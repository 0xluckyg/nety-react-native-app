import React, { Component } from 'react';
import { View } from 'react-native';
import BackgroundGeolocation from "react-native-background-geolocation";

class Geo extends Component {

    componentWillMount() {
        
        BackgroundGeolocation.on('location', this.onLocation);
        
        BackgroundGeolocation.on('error', this.onError);

        // This handler fires when movement states changes (stationary->moving; moving->stationary)
        BackgroundGeolocation.on('motionchange', this.onMotionChange);

        // This event fires when a chnage in motion activity is detected
        BackgroundGeolocation.on('activitychange', this.onActivityChange);

        // This event fires when the user toggles location-services
        BackgroundGeolocation.on('providerchange', this.onProviderChange);
        
        BackgroundGeolocation.configure({
            // Geolocation Config
            desiredAccuracy: 0,
            stationaryRadius: 25,
            distanceFilter: 10,
            // Activity Recognition
            stopTimeout: 1,
            // Application config            
            logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
            stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
            startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
            // HTTP / SQLite config
            url: 'http://yourserver.com/locations',            
            params: {               // <-- Optional HTTP params
                "auth_token": "maybe_your_server_authenticates_via_token_YES?"
            },
            // debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
        }, function(state) {
                // console.log("BackgroundGeolocation is configured and ready: ", state.enabled);
                if (!state.enabled) {
                    BackgroundGeolocation.start();
                }
            }
        );
    }

    // You must remove listeners when your component unmounts
    componentWillUnmount() {
        // Remove BackgroundGeolocation listeners
        BackgroundGeolocation.un('location', this.onLocation);
        BackgroundGeolocation.un('error', this.onError);
        BackgroundGeolocation.un('motionchange', this.onMotionChange);
        BackgroundGeolocation.un('activitychange', this.onActivityChange);
        BackgroundGeolocation.un('providerchange', this.onProviderChange);
    }
    
    onLocation(location) {
        // console.log('LOC ON',JSON.stringify(location));
    }

    onError(error) {
        var type = error.type;
        var code = error.code;
        // alert(type + " Error: " + code);
    }

    onActivityChange(activityName) {
        // console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
    }

    onProviderChange(provider) {
        // console.log('- Location provider changed: ', provider.enabled);    
    }

    onMotionChange(location) {
        // console.log('LOC CHANGE', JSON.stringify(location));
    }

    render() {
        return (
            <View></View>
        )
    }
};

export default Geo
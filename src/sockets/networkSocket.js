import * as networkActions from '../actions/networkActions';

function onGetNetwork(socket, dispatch) {
    socket.on('/self/getNetwork/success', users => {        
        dispatch(networkActions.resolveGetNetwork(users));
    })

    socket.on('/self/getNetwork/fail', () => {
        
    });
}

function onUpdateNetwork(socket, dispatch) {    
    socket.on('/self/updateLocation/fail', () => {
        
    });

    socket.on('/user/updateLocation', user => {
        // const distance = getDist(user.loc, )
        //If distance larger than 30km, remove. If not, add.
        dispatch(networkActions.addToNetwork(user));
        dispatch(networkActions.removeFromNetwork(user));
    });
}

function getNetwork(socket) {    
    socket.emit('/self/getNetwork', [-73.98767179999999,40.7285977]);
}

function getDist(loc1,loc2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(loc2[1]-loc1[1]);  // deg2rad below
    const dLon = deg2rad(loc2[0]-loc1[0]);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(loc1[1])) * Math.cos(deg2rad(loc2[1])) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
}

module.exports = {
    onGetNetwork,
    onUpdateNetwork,
    getNetwork    
}
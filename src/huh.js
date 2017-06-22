import {socket} from './sockets/socket'

function emitUpdate(self) {
    socket.emit('/self/update', self);
}

module.exports = {
    emitUpdate
}
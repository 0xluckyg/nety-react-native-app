const ChatroomSchema = {
    name: 'Chatroom',
    primaryKey: 'id',
    properties: {
        id: 'int',
        users: {type: 'list', objectType: 'User', indexed: true},
        messages: {type: 'list', objectType: 'messages', indexed: true}
    }
}

const MessagesSchema = {
    name: 'Chatroom',
    primaryKey: 'id',
    properties: {
        id: 'int',
        sender: {objectType: 'User', indexed: true},
        message: 'string',
        timestamp: 'date'
    }
}

export default UserSchema


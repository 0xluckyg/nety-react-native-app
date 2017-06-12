const UserSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'int',
        firstName: {type: 'string', indexed: true},
        lastName: {type: 'string', indexed: true},
        status: {type: 'string', optional: true, default: 'Still learning how Nety works'},
        bio: {type: 'string', optional: true, default: 'I just started using Nety!'},
        imageUrl: {type: 'string', optional: true},
        age: 'int',
        school: {type: 'string', optional: true},
        profession: {type: 'string', optional: true, indexed: true},
        job: {type: 'string', optional: true, indexed: true},
        experiences: {type: 'list', objectType: 'Experience'},
        contacts: {type: 'list', objectType: 'User'},
        blockedUsers: {type: 'list', objectType: 'Experience'}
    }
}

export default UserSchema


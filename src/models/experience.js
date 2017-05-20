var Realm = require("realm")

const ExperienceSchema = {
    name: 'Experience',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string',
        start: {type: 'date', indexed: true},
        end: {type: 'date', indexed: true}
    }
}

export default ExperienceSchema
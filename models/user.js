const {getDb} = require("../util/database");
const {ObjectId} = require("mongodb");

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    static findById(userId) {
        // find single user
        const db = getDb();
        return db
            .collection('users')
            .findOne({_id: new ObjectId(userId)})
            .then(result => {
                console.log('Found user: ', result)
                return result
            })
            .catch(err => console.log(err))
    }

    save() {
        // save user
        const db = getDb();
        return db
            .collection('users')
            .insertOne(this)
            .then(result => console.log('Created user successfully!'))
            .catch(err => console.log(err))
    }
}

module.exports = User;
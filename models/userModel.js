const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    displayName: {
        type: String
    },
    facebook: {
        type: Object
    },
    google: {
        type: Object
    },
    twitter: {
        type: Object
    }
});

module.exports = mongoose.model('User', UserSchema);
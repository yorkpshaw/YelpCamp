const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
/* Add onto schema a username, field for password, and make sure usernames are unique and not duplicated */
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

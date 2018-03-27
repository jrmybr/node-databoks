// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

// define the schema for our user model
var userSchema = mongoose.Schema({
      provider: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: [true, 'email field must be fill'],
        unique: true
      },
        password: String

    // facebook         : {
    //     id           : String,
    //     token        : String,
    //     name         : String,
    //     email        : String
    // },
    // google           : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // }

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    console.log('password :', password);
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null).toString('hex');
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

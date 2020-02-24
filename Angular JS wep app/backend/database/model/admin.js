const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let AdminSchema = new Schema({
    userName: {
        type: String
    },
    password: {
        type: String
    },
}, {
    collection: 'admin'
})

AdminSchema.statics.authenticate = function (userName, password, callback) {
    Admin.findOne({ userName: userName })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            if (password === user.password) {
                return callback(null, user);
            } else {
                return callback();
            }
        });
};
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
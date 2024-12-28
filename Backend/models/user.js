const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    collaborators: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
});

module.exports = mongoose.model('user', userSchema);
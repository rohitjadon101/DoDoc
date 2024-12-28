const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('document', documentSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    text: { type: String, required: true },
    by: { type: Schema.Types.ObjectId,ref: 'User', required: true }
}, {_id: false});

const answer = new Schema({
    text: { type: String, required: true },
    by: { type: Schema.Types.ObjectId,ref: 'User', required: true },
    at: { type: Schema.Types.Date, required: true, default: new Date()}
}, {_id: false});

const history = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    by: { type: Schema.Types.ObjectId,ref: 'User', required: true },
    at: { type: Schema.Types.Date, required: true, default: new Date()}
}, {_id: false});

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, required: true },
    status: { type: String, required: false, default: "open" },
    comments: [comment],
    answer: { type: answer, required: false },
    history: [history]
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Doubts', schema);
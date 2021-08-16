const settings = require('../settings.json');
const db = require('../helpers/db');
const userService = require('../users/user.service');
const { ObjectId } = require('mongodb');
const Doubts = db.Doubts;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    let doubts = await Doubts.find().populate('createdBy').populate('comments.by').populate('answer.by');
    return doubts;
}

async function getById(id) {
    return await Doubts.findById(id);
}

async function create(doubtParam) {
    const doubt = new Doubts(doubtParam);
    doubt.createdBy = new ObjectId(doubtParam.createdBy.id);
    await doubt.save();
}

async function update(id, doubtParam) {
    var doubt = await Doubts.findById(id);

    doubtParam.comments.forEach( comment => {
        comment.by = new ObjectId(comment.by.id);
    })
    doubt.comments = doubtParam.comments;
    doubt.status = doubtParam.status;
    doubt.answer = doubtParam.answer;
    if( doubt.answer && doubt.answer.by && doubt.answer.by.id ) {
        doubt.answer.by = new ObjectId(doubt.answer.by.id);
    } 
    doubt.history = doubtParam.history;
    await doubt.save();

    return doubt.populate('createdBy').populate('comments.by').populate('answer.by');
}

async function _delete(id) {
    await Doubts.findByIdAndRemove(id);
}
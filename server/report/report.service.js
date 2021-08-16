const settings = require('settings.json');
const db = require('../helpers/db');
const Doubts = db.Doubts;
const User = db.User;
const _ = require('underscore');

const { ObjectId } = require('mongodb');

module.exports = {
    getReport
};

async function getReport(params) {
    let doubts = await Doubts.find().populate('createdBy').populate('comments.by').populate('answer.by');
    let total = doubts.length;
    let resolved = _.filter(doubts, (doubt) => doubt.status === 'answered').length;
    let escalated = _.filter(doubts, (doubt) => doubt.status === 'escalated').length;
    let averageResolutionTime = ( _.filter(doubts, (doubt) => doubt.status === 'answered').reduce((memo, doubt) => memo + ( doubt.answer.at.getTime() - doubt.createdAt.getTime() )/ 60000, 0) ) / resolved;
    let users = await User.find({role: 'TA'});
    let taMap = {};
    _.each(users, (user) => {
       taMap[user.id] = {
           firstName: user.firstName,
           lastName: user.lastName,
           accepted: 0,
           answered: 0,
           escalated: 0,
           averageDoubtActivityTime: 0
       }
    });
    _.each( doubts, (doubt) => {
        _.each(doubt.history, function(history, index) {
             taMap[history.by.toHexString()] && taMap[history.by.toHexString()][history.to]++;
             if(history.to === 'answered' || history.to === 'escalated' ) {
                 taMap[history.by.toHexString()].averageDoubtActivityTime += ( history.at.getTime() - doubt.history[index - 1].at.getTime() ) / 60000;
             }
        });
    });

    let taReport = Object.values(taMap);
    taReport.forEach((ta) => {
        if(ta.accepted) {
            ta.averageDoubtActivityTime = ta.averageDoubtActivityTime / ta.accepted;
        }
    });

    return {
        aggregate: {
            total,
            resolved,
            escalated,
            averageResolutionTime
        },
        taReport
    };
}
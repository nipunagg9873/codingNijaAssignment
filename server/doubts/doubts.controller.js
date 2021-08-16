const express = require('express');
const router = express.Router();
const doubtsService = require('./doubts.service');

// routes
router.post('/raise', raise);
router.put('/:id', update);
router.get('/', getAll);
module.exports = router;

function raise(req, res, next) {
    let doubtParams = req.body;
    doubtParams.createdAt = Date.now();
    doubtsService.create(req.body)
        .then(() => res.json({}))
        .catch(err => {
            console.log(err);
            next(err);
        });
}

function getAll(req, res, next) {
    doubtsService.getAll()
        .then(doubts => res.json(doubts))
        .catch( err => { console.log(err); next(err); });
}

function update(req, res, next) {
    doubtsService.update(req.params.id, req.body)
        .then((doubt) => {
            res.json(doubt)
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
}
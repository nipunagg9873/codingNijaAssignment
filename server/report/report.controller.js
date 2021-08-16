const express = require('express');
const router = express.Router();
const reportService = require('./report.service');

router.get('/', getReport);

module.exports = router;

function getReport(req, res, next) {
    reportService.getReport(req.params.id, req.body)
        .then((report) => res.json(report))
        .catch( err => { console.log(err); next(err); });
}
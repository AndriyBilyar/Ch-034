var express = require('express'),
    router = express.Router({mergeParams: true}),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Module = require('../models/module');

router.get('/', function(req, res, next) {
    Module
        .find({'_course': req.params.courseId})
        .populate('_course', '_id')
        .sort({'_id': 1})
        .exec(function(error, modules) {
            return res.json(modules);
        });
});

router.get('/:moduleId', function(req, res) {
    Module
        .findOne({"_course": req.params.courseId, "_id": req.params.moduleId})
        .populate('_course', '_id')
        .populate('_resources')
        .exec(function(error, module) {
            if (error) throw error
            return res.json(module);
        })
});

module.exports = router;
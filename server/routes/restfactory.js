var express = require('express');

function getEntries(Model){
    return function(req, res, next){
        Model.find(function(err, entries){
            if(err){
                res.send(err);
            }
            res.send(entries);
        });
    }
}

function getEntry(Model) {
    return function (req, res, next) {
        var id = req.params.id;
        Model.findById(id, function (err, entry) {
            if (err) {
                res.send(err);
            }
            res.send(entry);
        });
    }
}

function createEntry(Model) {
    return function (req, res, next) {
        var model = new Model();
        model.id = req.body.id;
        model.alias = req.body.alias;

        model.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.send({message: Model.modelName + ' created'});
        });
    }
}

function updateEntry(Model) {
    return function (req, res, next) {
        var id = req.params.id;
        Model.findById(id, function (err, entry) {
            if (err) {
                res.send(err);
            }
            entry.id = req.body.id;
            entry.alias = req.body.alias;
            entry.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.send({message: Model.modelName + ' updated'});
            });
        });
    }
}

function deleteEntry(Model) {
    return function (req, res, next) {
        var id = req.params.id;
        Model.remove({
            _id: id
        }, function (err, entry) {
            if (err) {
                res.send(err);
            }
            res.send({message: Model.modelName + ' deleted'});
        });
    }
}

function buildRouter(Model){
    var router = express.Router();

    router.route('/')
        .get(getEntries(Model))
        .post(createEntry(Model));
    router.route('/:id')
        .get(getEntry(Model))
        .put(updateEntry(Model))
        .delete(deleteEntry(Model));

    return router;
}

module.exports = buildRouter;
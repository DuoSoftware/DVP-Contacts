/**
 * Created by Rajinda on 2/29/2016.
 */


var config = require('config');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var messageFormatter = require('dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js');
var moment = require("moment");
var async = require("async");

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert'),
    ObjectID = require('mongodb').ObjectID;

/*
 // Connection URL
 var url = 'mongodb://dave:password@localhost:27017?authMechanism=DEFAULT&authSource=db';
 */


// Connection URL
var url = 'mongodb://' + config.Mongo.user + ':' + config.Mongo.password + '@' + config.Mongo.ip + ':' + config.Mongo.port + '/' + config.Mongo.dbname; //'mongodb://localhost:27017/dvp-engagements';

var database;
var baseDb;
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    database = db.collection("Engagements");
    baseDb = db;
});

/*
 baseDb.authenticate(config.Mongo.user, config.Mongo.password, function(err, success){
 if(success){
 callback(null, db);
 }
 else {
 callback(err ? err : new Error('Could not authenticate user ' + user), null);
 }
 });

 */

var resetConnection = function () {
    try {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Reset Connection.....");
            database = db;
        });
    }
    catch (ex) {
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.error('[resetConnection] -  : %s ', jsonString);
    }
};

exports.saveContact = function (tenant, company, req, res) {

    res.setHeader('Content-Type', 'application/json');

    var schm = tenant + "-" + company;
    var collection = baseDb.collection(schm.toString());
    var now = moment(new Date());
    collection.insertOne({
        _id: req.body.ContactId.toString(),
        contactDetails: req.body.contactDetails
    }, function (err, result) {
        var jsonString = "";
        if (err) {
            logger.error('saveContact - [%s]', req.body.ContactId, err);
            jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            res.end(jsonString);
        }
        else {
            logger.info('saveContact - [%s]', result);
            jsonString = messageFormatter.FormatMessage(undefined, "saveContact", result.result.ok == 1, result.insertedId.toString());
            res.end(jsonString);
        }
    });

};

exports.updateContact = function (tenant, company, req, res) {

    res.setHeader('Content-Type', 'application/json');

    var jsonString;
    var schm = tenant + "-" + company;
    var collection = baseDb.collection(schm.toString());
    collection.update({'_id':req.params.ContactId},{$set:{'contactDetails':req.body.contactDetails}}, function (err, result) {
        if (!err) {
            logger.info('updateContact - [%s]', req.params.ContactId);
            jsonString = messageFormatter.FormatMessage(undefined, "EXCEPTION", result.result.ok == 1, insertedId);
            res.end(jsonString);
        }
        else {

            logger.error('updateContact - [%s]', req.params.ContactId, err);
            jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            res.end(jsonString);
        }
    })
};

exports.getContactById = function (tenant, company, req, res) {

    res.setHeader('Content-Type', 'application/json');

    var jsonString;
    var schm = tenant + "-" + company;
    var collection = baseDb.collection(schm.toString());
    collection.findOne({'_id':req.params.ContactId}, function (err, result) {
        if (!err) {
            logger.info('getContactById - [%s]', req.params.ContactId);
            jsonString = messageFormatter.FormatMessage(undefined, "EXCEPTION", result.result.ok == 1, insertedId);
            res.end(jsonString);
        }
        else {

            logger.error('getContactById - [%s]', req.params.ContactId, err);
            jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            res.end(jsonString);
        }
    })
};

exports.getContacts = function (tenant, company, req, res) {

    res.setHeader('Content-Type', 'application/json');

    var jsonString;
    var schm = tenant + "-" + company;
    var collection = baseDb.collection(schm.toString());
    collection.find({'_id':req.params.ContactId}, function (err, result) {
        if (!err) {
            logger.info('getContacts - [%s]', req.params.ContactId);
            jsonString = messageFormatter.FormatMessage(undefined, "EXCEPTION", result.result.ok == 1, insertedId);
            res.end(jsonString);
        }
        else {

            logger.error('getContacts - [%s]', req.params.ContactId, err);
            jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            res.end(jsonString);
        }
    })
};

exports.deleteContact = function (tenant, company, req, res) {

    res.setHeader('Content-Type', 'application/json');

    var jsonString;
    var schm = tenant + "-" + company;
    var collection = baseDb.collection(schm.toString());
    collection.deleteOne({'_id':req.params.ContactId}, function (err, result) {
        if (!err) {
            logger.info('deleteContact - [%s]', req.params.ContactId);
            jsonString = messageFormatter.FormatMessage(undefined, "EXCEPTION", result.result.ok == 1, insertedId);
            res.end(jsonString);
        }
        else {

            logger.error('deleteContact - [%s]', req.params.ContactId, err);
            jsonString = messageFormatter.FormatMessage(err, "EXCEPTION", false, undefined);
            res.end(jsonString);
        }
    })
};


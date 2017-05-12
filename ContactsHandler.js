/**
 * Created by Rajinda on 2/29/2016.
 */


var config = require('config');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var messageFormatter = require('dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js');
var moment = require("moment");
var async = require("async");
var util = require('util');
var Contact = require('./contact').Contact;


var mongoip = config.Mongo.ip;
var mongoport = config.Mongo.port;
var mongodb = config.Mongo.dbname;
var mongouser = config.Mongo.user;
var mongopass = config.Mongo.password;
var mongoreplicaset= config.Mongo.replicaset;


var mongoose = require('mongoose');
var connectionstring = '';
mongoip = mongoip.split(',');
if(util.isArray(mongoip)){

    mongoip.forEach(function(item){
        connectionstring += util.format('%s:%d,',item,mongoport)
    });

    connectionstring = connectionstring.substring(0, connectionstring.length - 1);
    connectionstring = util.format('mongodb://%s:%s@%s/%s',mongouser,mongopass,connectionstring,mongodbase);

    if(mongoreplicaset){
        connectionstring = util.format('%s?replicaSet=%s',connectionstring,mongoreplicaset) ;
        console.log("connectionstring ...   "+connectionstring);
    }
}else{

    connectionstring = util.format('mongodb://%s:%s@%s:%d/%s',mongouser,mongopass,mongoip,mongoport,mongodbase);
    console.log("connectionstring ...   "+connectionstring);
}



mongoose.connection.on('error', function (err) {
    console.error( new Error(err));
});

mongoose.connection.on('disconnected', function() {
    console.error( new Error('Could not connect to database'));
});

mongoose.connection.once('open', function() {
    console.log("Connected to db");
});


mongoose.connect(connectionstring);
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


    var jsonString = "";
    var contactObject = Contact({
        company: company,
        tenant: tenant,
        contact: req.body.contact,
        type: req.body.type,
        name: req.body.name
    });

    contactObject.save(function (errSave, resSave) {
        if (errSave) {
            jsonString = messageFormatter.FormatMessage(errSave, "Contact saving failed", false, undefined);

        }
        else {
            jsonString = messageFormatter.FormatMessage(undefined, "Contact saving succeed", true, resSave);

        }
        res.end(jsonString);
    });


};

exports.updateContact = function (tenant, company, req, res) {

    var jsonString;

    Contact.findOneAndUpdate({
        _id: req.params.ContactId,
        company: company,
        tenant: tenant
    }, req.body, function (errSave, resSave) {
        if (errSave) {
            jsonString = messageFormatter.FormatMessage(errSave, "Contact update failed", false, undefined);

        }
        else {
            jsonString = messageFormatter.FormatMessage(undefined, "Contact update succeed", true, resSave);

        }
        res.end(jsonString);
    });


};

exports.getContactById = function (tenant, company, req, res) {


    var jsonString;

    Contact.findOne({_id: req.params.ContactId, company: company, tenant: tenant}, function (errSave, resSave) {
        if (errSave) {
            jsonString = messageFormatter.FormatMessage(errSave, "Contact get failed", false, undefined);

        }
        else {
            jsonString = messageFormatter.FormatMessage(undefined, "Contact get succeed", true, resSave);

        }
        res.end(jsonString);
    });
};

exports.getContacts = function (tenant, company, req, res) {

    var jsonString;

    Contact.find({company: company, tenant: tenant}, function (errSave, resSave) {
        if (errSave) {
            jsonString = messageFormatter.FormatMessage(errSave, "Contacts get failed", false, undefined);

        }
        else {
            jsonString = messageFormatter.FormatMessage(undefined, "Contacts get succeed", true, resSave);

        }
        res.end(jsonString);
    });
};

exports.deleteContact = function (tenant, company, req, res) {

    var jsonString;

    Contact.findOneAndRemove({
        _id: req.params.ContactId,
        company: company,
        tenant: tenant
    }, function (errSave, resSave) {
        if (errSave) {
            jsonString = messageFormatter.FormatMessage(errSave, "Contact remove failed", false, undefined);

        }
        else {
            jsonString = messageFormatter.FormatMessage(undefined, "Contact remove succeed", true, resSave);

        }
        res.end(jsonString);
    });

};


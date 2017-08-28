/**
 * Created by Rajinda on 2/29/2016.
 */


var config = require('config');
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var messageFormatter = require('dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js');
var moment = require("moment");
var async = require("async");
var util = require('util');
/*var Contact = require('./contact').Contact;*/
var Contact = require('dvp-mongomodels/model/Contact');


exports.saveContact = function (tenant, company, req, res) {


    var jsonString = "";
    var contactObject = Contact({
        company: company,
        tenant: tenant,
        contact: req.body.contact,
        category: req.body.category,
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
    var query = {company: company, tenant: tenant};
    if (req.params.category) {
        query.category = req.params.category;
    }

    Contact.find(query, function (errSave, resSave) {
        if (errSave) {
            jsonString = messageFormatter.FormatMessage(errSave, "Contacts get failed", false, undefined);

        }
        else {
            jsonString = messageFormatter.FormatMessage(undefined, "Contacts get succeed", true, resSave);

        }
        res.end(jsonString);
    }).select("contact type name category");
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


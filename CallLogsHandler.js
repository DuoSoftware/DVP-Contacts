/**
 * Created by Waruna on 8/18/2017.
 */


var CallLogs = require('dvp-mongomodels/model/CallLogs');
var messageFormatter = require('dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js');

exports.SaveCallLogs = function (req, res) {
    var jsonString;
    var tenant = parseInt(req.user.tenant);
    var company = parseInt(req.user.company);
    var iss = req.user.iss;
    var log = req.body.log;
    if (req.body && log) {

        /*var callLogs = CallLogs({
         "resourceName": iss,
         "resourceId": iss,
         "logs":req.body.log,
         "tenant":tenant,
         "company":company,
         "created_at": Date.now(),
         "updated_at": Date.now()
         });

         callLogs.save(function (err, report) {
         if (err) {
         jsonString = messageFormatter.FormatMessage(err, "saveCallLogs save failed", false, null);
         } else {
         jsonString = messageFormatter.FormatMessage(null, "saveCallLogs saved successfully", true, report);
         }
         res.end(jsonString);
         });*/


        CallLogs.update({
            resourceName: iss,
            resourceId: iss,
            company: company,
            tenant: tenant,
            "logs.callLogSessionId": log.callLogSessionId
        }, {
            $set: {
                "resourceName": iss,
                "resourceId": iss,
                "logs": log,
                "tenant": tenant,
                "company": company,
                "created_at": Date.now(),
                "updated_at": Date.now()
            }
        }, {upsert: true, new: true}, function (err, report) {
            if (err) {
                jsonString = messageFormatter.FormatMessage(err, "saveCallLogs save failed", false, null);
            } else {
                jsonString = messageFormatter.FormatMessage(null, "saveCallLogs saved successfully", true, report);
            }
            res.end(jsonString);
        });

    } else {
        jsonString = messageFormatter.FormatMessage(null, "Require fields not found", false, null);
        res.end(jsonString);

    }

};

module.exports.GetCallLogs = function (req, res) {

    var jsonString;
    var tenant = parseInt(req.user.tenant);
    var company = parseInt(req.user.company);
    var iss = req.user.iss;

    var page = parseInt(req.params.Page),
        size = parseInt(req.params.Size),
        skip = page > 0 ? ((page - 1) * size) : 0;

    if (iss) {
        CallLogs.find({resourceName: iss, resourceId: iss, company: company, tenant: tenant}).skip(skip)
            .limit(size).select("-_id logs created_at")
            .exec(function (err, report) {
                if (err) {
                    jsonString = messageFormatter.FormatMessage(err, "Fail to find CallLogs", false, null);
                } else {
                    jsonString = messageFormatter.FormatMessage(null, "CallLogs Details", true, report);
                }
                res.end(jsonString);
            });
    } else {
        jsonString = messageFormatter.FormatMessage(null, "Require fields not found", false, null);
        res.end(jsonString);
    }
};

module.exports.SearchCallLogs = function (req, res) {

    var jsonString;
    var tenant = parseInt(req.user.tenant);
    var company = parseInt(req.user.company);
    var iss = req.user.iss;
    var searchText = req.params.Number;

    if (iss) {
        //var query = Product.find({"title": new RegExp(".*" + value.replace(/(\W)/g, "\\$1") + ".*", "i")}).limit(3);
        CallLogs.find({
            resourceName: iss,
            resourceId: iss,
            company: company,
            tenant: tenant,
            "logs.data.number": new RegExp(".*" + searchText.replace(/(\W)/g, "\\$1") + ".*", "i")
        }, function (err, report) {
            if (err) {
                jsonString = messageFormatter.FormatMessage(err, "Fail to find CallLogs", false, null);
            } else {
                jsonString = messageFormatter.FormatMessage(null, "CallLogs Details", true, report);
            }
            res.end(jsonString);
        }).limit(100);
    } else {
        jsonString = messageFormatter.FormatMessage(null, "Require fields not found", false, null);
        res.end(jsonString);
    }
};

module.exports.GetCallLogCount = function (req, res) {

    var jsonString;
    var tenant = parseInt(req.user.tenant);
    var company = parseInt(req.user.company);
    var iss = req.user.iss;


    if (iss) {
        CallLogs.count({resourceName: iss, resourceId: iss, company: company, tenant: tenant}, function (err, report) {
            if (err) {
                jsonString = messageFormatter.FormatMessage(err, "Fail to Get CallLog Count", false, null);
            } else {
                jsonString = messageFormatter.FormatMessage(null, "GetCallLogCount ", true, report);
            }
            res.end(jsonString);
        });
    } else {
        jsonString = messageFormatter.FormatMessage(null, "Require fields not found", false, null);
        res.end(jsonString);
    }
};
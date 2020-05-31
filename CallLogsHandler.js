/**
 * Created by Waruna on 8/18/2017.
 */


var CallLogs = require('dvp-mongomodels/model/CallLogs');
var messageFormatter = require('dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js');

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

        var data ={
            "resourceName": iss,
            "resourceId": iss,
            "data":log.data,
            "tenant":tenant,
            "company":company,
            "created_at": Date.now(),
            "updated_at": Date.now()
        };
        CallLogs.update({'data.callLogSessionId': log.data.callLogSessionId}, data, {upsert: true}, function (err, report) {
            if (err) {
                jsonString = messageFormatter.FormatMessage(err, "saveCallLogs save failed", false, null);
            } else {
                jsonString = messageFormatter.FormatMessage(null, "saveCallLogs saved successfully", true, report);
            }
            res.end(jsonString);
        });


        /*CallLogs.update({
            resourceName: iss,
            resourceId: iss,
            company: company,
            tenant: tenant,
            'data.callLogSessionId': log.data.callLogSessionId
        }, {
            $setOnInsert: {
                "resourceName": iss,
                "resourceId": iss,
                "tenant": tenant,
                "company": company,
                "created_at": Date.now()
            },
            $set: {
                "data": log.data,
                "updated_at": Date.now()
            }

        }, {upsert: true, new: true}, function (err, report) {
            if (err) {
                jsonString = messageFormatter.FormatMessage(err, "saveCallLogs save failed", false, null);
            } else {
                jsonString = messageFormatter.FormatMessage(null, "saveCallLogs saved successfully", true, report);
            }
            res.end(jsonString);
        });*/

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
    if (req.params.ResourceName) {
        iss = req.params.ResourceName;
    }

    var page = parseInt(req.params.Page),
        size = parseInt(req.params.Size),
        skip = page > 0 ? ((page - 1) * size) : 0;

    var query = {resourceName: iss, resourceId: iss, company: company, tenant: tenant};
    if (req.params.date) {

        var from = new Date();
        var to = new Date();

        switch (req.params.date.toLowerCase()) {
            case "today":

                /*from.setDate(from.getDate()-1);
                 from.setDate(from.getDate()-1);
                 from.setHours(0,0,0,0);
                 to.setHours(24,0,0,0);*/
                break;
            case "yesterday":
                from.setDate(from.getDate() - 1);
                to.setDate(to.getDate() - 1);
                break;
            default:

        }

        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        query['created_at'] = {"$gte": from, "$lte": to};// {"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}}
    }
    if (iss) {
        CallLogs.find(query).skip(skip)
            .limit(size).select("-_id data created_at").sort({created_at: -1})
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
        CallLogs.find({
            resourceName: iss,
            resourceId: iss,
            company: company,
            tenant: tenant,
            "data.number": new RegExp(".*" + searchText.replace(/(\W)/g, "\\$1") + ".*", "i")
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
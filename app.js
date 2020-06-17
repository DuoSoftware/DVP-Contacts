/**
 * Created by Pawan on 6/1/2015.
 */

var restify = require("restify");
var messageFormatter = require("dvp-common-lite/CommonMessageGenerator/ClientMessageJsonFormatter.js");

var config = require("config");

var port = config.Host.port || 3000;
var version = config.Host.version;
var logger = require("dvp-common-lite/LogHandler/CommonLogHandler.js").logger;
var contactHandler = require("./ContactsHandler");
var callLogsHandler = require("./CallLogsHandler");

var util = require("util");

//-------------------------  Restify Server ------------------------- \\
var RestServer = restify.createServer({
  name: "ContactService",
  version: "1.0.0",
});

restify.CORS.ALLOW_HEADERS.push("authorization");
RestServer.use(restify.CORS());
RestServer.use(restify.fullResponse());
RestServer.use(restify.acceptParser(RestServer.acceptable));
RestServer.use(restify.queryParser());
RestServer.use(restify.bodyParser());

//Server listen
RestServer.listen(port, function () {
  console.log("%s listening at %s", RestServer.name, RestServer.url);
});

// ---------------- Security -------------------------- \\
var jwt = require("restify-jwt");
var secret = require("dvp-common-lite/Authentication/Secret.js");
var authorization = require("dvp-common-lite/Authentication/Authorization.js");
RestServer.use(jwt({ secret: secret.Secret }));
// ---------------- Security -------------------------- \\

//-------------------------  Restify Server ------------------------- \\

var mongoip = config.Mongo.ip;
var mongoport = config.Mongo.port;
var mongodb = config.Mongo.dbname;
var mongouser = config.Mongo.user;
var mongopass = config.Mongo.password;
var mongoreplicaset = config.Mongo.replicaset;

var mongoose = require("mongoose");
var connectionstring = "";
mongoip = mongoip.split(",");
if (util.isArray(mongoip)) {
  if (mongoip.length > 1) {
    mongoip.forEach(function (item) {
      connectionstring += util.format("%s:%d,", item, mongoport);
    });

    connectionstring = connectionstring.substring(
      0,
      connectionstring.length - 1
    );
    connectionstring = util.format(
      "mongodb://%s:%s@%s/%s",
      mongouser,
      mongopass,
      connectionstring,
      mongodb
    );

    if (mongoreplicaset) {
      connectionstring = util.format(
        "%s?replicaSet=%s",
        connectionstring,
        mongoreplicaset
      );
      console.log("connectionstring ...   " + connectionstring);
    }
  } else {
    connectionstring = util.format(
      "mongodb://%s:%s@%s:%d/%s",
      mongouser,
      mongopass,
      mongoip[0],
      mongoport,
      mongodb
    );
  }
} else {
  connectionstring = util.format(
    "mongodb://%s:%s@%s:%d/%s",
    mongouser,
    mongopass,
    mongoip,
    mongoport,
    mongodb
  );
}

console.log("connectionstring ...   " + connectionstring);

mongoose.connection.on("error", function (err) {
  console.error(new Error(err));
});

mongoose.connection.on("disconnected", function () {
  console.error(new Error("Could not connect to database"));
});

mongoose.connection.once("open", function () {
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
  } catch (ex) {
    var jsonString = messageFormatter.FormatMessage(
      ex,
      "EXCEPTION",
      false,
      undefined
    );
    logger.error("[resetConnection] -  : %s ", jsonString);
  }
};

//-------------------------  ContactService ------------------------- \\

RestServer.post(
  "/DVP/API/" + version + "/ContactManager/Contact",
  authorization({
    resource: "contact",
    action: "write",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "[saveContact] - [HTTP]  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      if (!req.user || !req.user.tenant || !req.user.company)
        throw new Error("invalid tenant or company.");
      var tenantId = req.user.tenant;
      var companyId = req.user.company;

      contactHandler.saveContact(tenantId, companyId, req, res);
    } catch (ex) {
      logger.error(
        "[saveContact] - [HTTP]  - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("[saveContact] - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

RestServer.put(
  "/DVP/API/" + version + "/ContactManager/Contact/:ContactId",
  authorization({
    resource: "contact",
    action: "write",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "[updateContact] - [HTTP]  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      if (!req.user || !req.user.tenant || !req.user.company)
        throw new Error("invalid tenant or company.");
      var tenantId = req.user.tenant;
      var companyId = req.user.company;

      contactHandler.updateContact(tenantId, companyId, req, res);
    } catch (ex) {
      logger.error(
        "[updateContact] - [HTTP]  - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("[updateContact] - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

RestServer.get(
  "/DVP/API/" + version + "/ContactManager/Contact/:ContactId",
  authorization({
    resource: "contact",
    action: "read",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "[getContactById] - [HTTP]  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      if (!req.user || !req.user.tenant || !req.user.company)
        throw new Error("invalid tenant or company.");
      var tenantId = req.user.tenant;
      var companyId = req.user.company;

      contactHandler.getContactById(tenantId, companyId, req, res);
    } catch (ex) {
      logger.error(
        "[getContactById] - [HTTP]  - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("[getContactById] - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

RestServer.get(
  "/DVP/API/" + version + "/ContactManager/Contacts",
  authorization({
    resource: "contact",
    action: "read",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "[getContacts] - [HTTP]  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      if (!req.user || !req.user.tenant || !req.user.company)
        throw new Error("invalid tenant or company.");
      var tenantId = req.user.tenant;
      var companyId = req.user.company;

      contactHandler.getContacts(tenantId, companyId, req, res);
    } catch (ex) {
      logger.error(
        "[getContacts] - [HTTP]  - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("[getContacts] - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

RestServer.del(
  "/DVP/API/" + version + "/ContactManager/Contact/:ContactId",
  authorization({
    resource: "contact",
    action: "write",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "[deleteContact] - [HTTP]  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      if (!req.user || !req.user.tenant || !req.user.company)
        throw new Error("invalid tenant or company.");
      var tenantId = req.user.tenant;
      var companyId = req.user.company;

      contactHandler.deleteContact(tenantId, companyId, req, res);
    } catch (ex) {
      logger.error(
        "[deleteContact] - [HTTP]  - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("[deleteContact] - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

//------------------------- End-ContactService ------------------------- \\

RestServer.post(
  "/DVP/API/" + version + "/ContactManager/CallLog",
  authorization({
    resource: "contact",
    action: "write",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "saveCallLogs  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      callLogsHandler.SaveCallLogs(req, res);
    } catch (ex) {
      logger.error(
        "saveCallLogs - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("saveCallLogs - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

RestServer.get(
  "/DVP/API/" + version + "/ContactManager/CallLog/:Size/:Page",
  authorization({
    resource: "contact",
    action: "write",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "GetCallLogs  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      callLogsHandler.GetCallLogs(req, res);
    } catch (ex) {
      logger.error(
        "GetCallLogs - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("GetCallLogs - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

RestServer.get(
  "/DVP/API/" +
    version +
    "/ContactManager/Resource/:ResourceName/CallLog/:Size/:Page",
  authorization({
    resource: "contact",
    action: "write",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "GetCallLogs  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      callLogsHandler.GetCallLogs(req, res);
    } catch (ex) {
      logger.error(
        "GetCallLogs - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("GetCallLogs - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

RestServer.get(
  "/DVP/API/" + version + "/ContactManager/CallLog/Count",
  authorization({
    resource: "contact",
    action: "read",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "GetCallLogCount  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      callLogsHandler.GetCallLogCount(req, res);
    } catch (ex) {
      logger.error(
        "GetCallLogCount - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("GetCallLogCount - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

RestServer.get(
  "/DVP/API/" + version + "/ContactManager/SearchCallLog/:Number",
  authorization({
    resource: "contact",
    action: "read",
  }),
  function (req, res, next) {
    try {
      logger.info(
        "SearchCallLogs  - Request received -  Data - %s ",
        JSON.stringify(req.body)
      );

      callLogsHandler.SearchCallLogs(req, res);
    } catch (ex) {
      logger.error(
        "SearchCallLogs - Exception occurred -  Data - %s ",
        JSON.stringify(req.body),
        ex
      );
      var jsonString = messageFormatter.FormatMessage(
        ex,
        "EXCEPTION",
        false,
        undefined
      );
      logger.debug("SearchCallLogs - Request response : %s ", jsonString);
      res.end(jsonString);
    }
    return next();
  }
);

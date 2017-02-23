/**
 * Created by Pawan on 6/1/2015.
 */

var restify = require('restify');
var cors = require('cors');
var messageFormatter = require('dvp-common/CommonMessageGenerator/ClientMessageJsonFormatter.js');

var config = require('config');

var port = config.Host.port || 3000;
var version = config.Host.version;
var logger = require('dvp-common/LogHandler/CommonLogHandler.js').logger;
var contactHandler = require('./ContactsHandler');



//-------------------------  Restify Server ------------------------- \\
var RestServer = restify.createServer({
    name: "ContactService",
    version: '1.0.0'
});

restify.CORS.ALLOW_HEADERS.push('authorization');
RestServer.use(restify.CORS());
RestServer.use(restify.fullResponse());

//Server listen
RestServer.listen(port, function () {
    
    console.log('%s listening at %s', RestServer.name, RestServer.url);
});

//Enable request body parsing(access)
RestServer.use(restify.bodyParser());
RestServer.use(restify.acceptParser(RestServer.acceptable));
RestServer.use(restify.queryParser());
RestServer.use(cors());

// ---------------- Security -------------------------- \\
var jwt = require('restify-jwt');
var secret = require('dvp-common/Authentication/Secret.js');
var authorization = require('dvp-common/Authentication/Authorization.js');
RestServer.use(jwt({secret: secret.Secret}));
// ---------------- Security -------------------------- \\


//-------------------------  Restify Server ------------------------- \\

//-------------------------  ContactService ------------------------- \\

RestServer.post('/DVP/API/' + version + '/ContactManager/Contact', authorization({
    resource: "contact",
    action: "write"
}), function (req, res, next) {
    try {

        logger.info('[saveContact] - [HTTP]  - Request received -  Data - %s ', JSON.stringify(req.body));

        if (!req.user ||!req.user.tenant || !req.user.company)
            throw new Error("invalid tenant or company.");
        var tenantId = req.user.tenant;
        var companyId = req.user.company;

        contactHandler.saveContact(tenantId,companyId,req,res);

    }
    catch (ex) {

        logger.error('[saveContact] - [HTTP]  - Exception occurred -  Data - %s ', JSON.stringify(req.body), ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[saveContact] - Request response : %s ', jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.put('/DVP/API/' + version + '/ContactManager/Contact/:ContactId', authorization({
    resource: "contact",
    action: "write"
}), function (req, res, next) {
    try {

        logger.info('[updateContact] - [HTTP]  - Request received -  Data - %s ', JSON.stringify(req.body));

        if (!req.user ||!req.user.tenant || !req.user.company)
            throw new Error("invalid tenant or company.");
        var tenantId = req.user.tenant;
        var companyId = req.user.company;

        contactHandler.updateContact(tenantId,companyId,req,res);

    }
    catch (ex) {

        logger.error('[updateContact] - [HTTP]  - Exception occurred -  Data - %s ', JSON.stringify(req.body), ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[updateContact] - Request response : %s ', jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.get('/DVP/API/' + version + '/ContactManager/Contact/:ContactId', authorization({
    resource: "contact",
    action: "read"
}), function (req, res, next) {
    try {

        logger.info('[getContactById] - [HTTP]  - Request received -  Data - %s ', JSON.stringify(req.body));

        if (!req.user ||!req.user.tenant || !req.user.company)
            throw new Error("invalid tenant or company.");
        var tenantId = req.user.tenant;
        var companyId = req.user.company;

        contactHandler.getContactById(tenantId,companyId,req,res);

    }
    catch (ex) {

        logger.error('[getContactById] - [HTTP]  - Exception occurred -  Data - %s ', JSON.stringify(req.body), ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[getContactById] - Request response : %s ', jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.get('/DVP/API/' + version + '/ContactManager/Contacts', authorization({
    resource: "contact",
    action: "read"
}), function (req, res, next) {
    try {

        logger.info('[getContacts] - [HTTP]  - Request received -  Data - %s ', JSON.stringify(req.body));

        if (!req.user ||!req.user.tenant || !req.user.company)
            throw new Error("invalid tenant or company.");
        var tenantId = req.user.tenant;
        var companyId = req.user.company;

        contactHandler.getContacts(tenantId,companyId,req,res);

    }
    catch (ex) {

        logger.error('[getContacts] - [HTTP]  - Exception occurred -  Data - %s ', JSON.stringify(req.body), ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[getContacts] - Request response : %s ', jsonString);
        res.end(jsonString);
    }
    return next();
});

RestServer.del('/DVP/API/' + version + '/ContactManager/Contact/:ContactId', authorization({
    resource: "contact",
    action: "write"
}), function (req, res, next) {
    try {

        logger.info('[deleteContact] - [HTTP]  - Request received -  Data - %s ', JSON.stringify(req.body));

        if (!req.user ||!req.user.tenant || !req.user.company)
            throw new Error("invalid tenant or company.");
        var tenantId = req.user.tenant;
        var companyId = req.user.company;

        contactHandler.deleteContact(tenantId,companyId,req,res);

    }
    catch (ex) {

        logger.error('[deleteContact] - [HTTP]  - Exception occurred -  Data - %s ', JSON.stringify(req.body), ex);
        var jsonString = messageFormatter.FormatMessage(ex, "EXCEPTION", false, undefined);
        logger.debug('[deleteContact] - Request response : %s ', jsonString);
        res.end(jsonString);
    }
    return next();
});


//------------------------- End-ContactService ------------------------- \\

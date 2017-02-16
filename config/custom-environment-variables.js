module.exports = {
 "DB": {
    "Type":"SYS_DATABASE_TYPE",
    "User":"SYS_DATABASE_POSTGRES_USER",
    "Password":"SYS_DATABASE_POSTGRES_PASSWORD",
    "Port":"SYS_SQL_PORT",
    "Host":"SYS_DATABASE_HOST",
    "Database":"SYS_DATABASE_POSTGRES_USER"
  },
    "Host":
    {
        "domain": "HOST_NAME",
        "port": "HOST_ENGAGEMENTSERVICE_PORT",
        "version": "HOST_VERSION",
        "hostpath":"HOST_PATH",
        "logfilepath": "LOG4JS_CONFIG"
    }
,"Security":
    {
        "ip": "SYS_REDIS_HOST",
        "port": "SYS_REDIS_PORT",
        "user": "SYS_REDIS_USER",
        "password": "SYS_REDIS_PASSWORD"

    },
    "Mongo":
    {
        "ip":"SYS_MONGO_HOST",
        "port":"SYS_MONGO_PORT",
        "dbname":"SYS_MONGO_DB",
        "user":"SYS_MONGO_USER",
        "password":"SYS_MONGO_PASSWORD"
    }
};


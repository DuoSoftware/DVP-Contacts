module.exports = {
 "DB": {
    "Type":"SYS_DATABASE_TYPE",
    "User":"SYS_DATABASE_POSTGRES_USER",
    "Password":"SYS_DATABASE_POSTGRES_PASSWORD",
    "Port":"SYS_SQL_PORT",
    "Host":"SYS_DATABASE_HOST",
    "Database":"SYS_DATABASE_NAME"
  },
    "Host":
    {
        "domain": "HOST_NAME",
        "port": "HOST_CONTACTS_PORT",
        "version": "HOST_VERSION",
        "hostpath":"NODE_CONFIG_DIR",
        "logfilepath": "LOG4JS_CONFIG"
    },
   "Redis":
    {
        "mode":"SYS_REDIS_MODE",
        "ip": "SYS_REDIS_HOST",
        "port": "SYS_REDIS_PORT",
        "user": "SYS_REDIS_USER",
        "db": "SYS_REDIS_DB_CONFIG",
        "password": "SYS_REDIS_PASSWORD",
        "ttl":"SYS_TTL",
        "sentinels":{
            "hosts": "SYS_REDIS_SENTINEL_HOSTS",
            "port":"SYS_REDIS_SENTINEL_PORT",
            "name":"SYS_REDIS_SENTINEL_NAME"
        }

    },

    "Security":
    {

        "ip": "SYS_REDIS_HOST",
        "port": "SYS_REDIS_PORT",
        "user": "SYS_REDIS_USER",
        "password": "SYS_REDIS_PASSWORD",
        "mode":"SYS_REDIS_MODE",
        "sentinels":{
            "hosts": "SYS_REDIS_SENTINEL_HOSTS",
            "port":"SYS_REDIS_SENTINEL_PORT",
            "name":"SYS_REDIS_SENTINEL_NAME"
        }

    },
    "Mongo":
    {
        "ip":"SYS_MONGO_HOST",
        "port":"SYS_MONGO_PORT",
        "dbname":"SYS_MONGO_DB",
        "user":"SYS_MONGO_USER",
        "type": "SYS_MONGO_TYPE",
        "password":"SYS_MONGO_PASSWORD",
        "replicaset" :"SYS_MONGO_REPLICASETNAME"
    }
};


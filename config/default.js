module.exports = {
    "DB": {
        "Type": "postgres",
        "User": "",
        "Password": "",
        "Port": 5432,
        "Host": "",
        "Database": "duo"
    },
    "Redis": {
        "mode": "instance",//instance, cluster, sentinel
        "ip": "",
        "port": 6389,
        "user": "",
        "db": 0,
        "password": "",
        "ttl": 30000,
        "sentinels": {
            "hosts": "",
            "port": 16389,
            "name": "redis-cluster"
        }

    },

    "Security": {

        "ip": "",
        "port": 6389,
        "user": "",
        "password": "",
        "mode": "instance",//instance, cluster, sentinel
        "sentinels": {
            "hosts": "",
            "port": 16389,
            "name": "redis-cluster"
        }
    },
    "Host": {
        "domain": "0.0.0.0",
        "port": 8827,
        "version": "1.0.0.0",
        "hostpath": "./config",
        "logfilepath": ""
    },
    "Mongo":
        {
            "ip":"",
            "port":"",
            "dbname":"",
            "password":"",
            "user":"",
            "type": "mongodb+srv",
        },
};

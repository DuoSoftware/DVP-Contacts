module.exports = {
    "DB": {
        "Type": "postgres",
        "User": "duo",
        "Password": "DuoS123",
        "Port": 5432,
        "Host": "104.236.231.11",
        "Database": "duo"
    },
    "Redis": {
        "mode": "instance",//instance, cluster, sentinel
        "ip": "138.197.90.92",
        "port": 6389,
        "user": "duo",
        "db": 0,
        "password": "DuoS123",
        "ttl": 30000,
        "sentinels": {
            "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
            "port": 16389,
            "name": "redis-cluster"
        }

    },

    "Security": {

        "ip": "138.197.90.92",
        "port": 6389,
        "user": "duo",
        "password": "DuoS123",
        "mode": "instance",//instance, cluster, sentinel
        "sentinels": {
            "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
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
            "ip":"104.236.231.11",
            "port":"27017",
            "dbname":"dvpdb",
            "password":"DuoS123",
            "user":"duo"
        },
};

module.exports = {
    "DB": {
        "Type": "postgres",
        "User": "duo",
        "Password": "DuoS123",
        "Port": 5432,
        "Host": "localhost",
        "Database": "dvp-engagements"
    },
    "Redis":
    {
        "ip": "45.55.142.207",
        "port": 6389,
        "password":"DuoS123"

    },
    "Security":
    {
        "ip" : "45.55.142.207",
        "port": 6389,
        "user": "duo",
        "password": "DuoS123"
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
        "ip":"45.55.142.207",
        "port":"27017",
        "dbname":"dvpdb",
        "user":"duo",
        "password":"DuoS123"
    }
};
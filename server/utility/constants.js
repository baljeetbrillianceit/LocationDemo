require('dotenv').config()

module.exports = Object.freeze({
    JWTokenKey: "BRILLIANCEITATTENDANCE",
    

    //-------------------------------------------------------------------------
    // CONFIGURATION
    configMySql: {
        host: 'localhost',
        user: 'root',
        password: '1313',
        port: '3306',
        database: 'demo',
        multipleStatements: true
    },
    // configMySql: {
    //     host: 'bnaouvq7ffdlmm4jgel9-mysql.services.clever-cloud.com',
    //     user: 'uwk5vn0vg89u7gq4',
    //     password: 'cVDaApXFlj3M1B89EKwc',
    //     port: '3306',
    //     database: 'bnaouvq7ffdlmm4jgel9',
    //     multipleStatements: true
    // },
    //-------------------------------------------------------------------------

    //ENUM
    apiEnum: {
        Login: 'login',
        Dashboard: 'dashboard',
        inTime: 'intime',
        outTime: 'outtime',
        userEntries: 'userEntries',
        locations: 'locations'
    },


});
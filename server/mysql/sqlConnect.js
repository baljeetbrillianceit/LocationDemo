var sqlDb = function () {
    'use strict';

    var mysql = require('mysql');
    const Constants = require('../utility/constants.js')

    return {

        connectDb: async function (req, errFn, procName, inputObject, serviceName, responseBack) {
            const func = require('../utility/genericFunction.js');
            MYsqlDB()

            async function MYsqlDB() {
                var connection = mysql.createConnection(Constants.configMySql);
                await connection.connect(function (err) {

                    if (err) {
                        errroFunc(err);
                        return;
                    }
                    let params = "",
                        counter = 0;
                    inputObject.forEach(async element => {
                        if (typeof element.value === 'string'){
                            let d = JSON.stringify(element.value)
                            //let d1 = JSON.stringify('Amandeep ?')
                            let search = d.replace(/(^"|"$)/g, '');
                            // if (element.node == "user_username"){
                            //     element.value = SqlString.escape(d1)
                            // } else {
                                element.value = search
                           // }
                        }
                        (counter == 0) ? params = '"' + element.value + '"': params = params + ' , ' + '"' + element.value + '"'
                        counter += 1
                    })

                    console.log("CALL " + procName + "(" + params + ")")

                    connection.query(`${"CALL " + procName+"("+ params+")"}`, (err, result) => {
                        if (err) {
                            errroFunc(err);
                            return;
                        }
                        responseBack(result)
                        // func.loggerFunc(Constants.logInfo, req, result);
                        connection.end();

                    });
                })
                function errroFunc(err) {
                    // console.log(err)
                    // func.loggerFunc(Constants.logError, req, err);
                    var message = func.errorFunc(err.message || "Err");
                    errFn(message);
                    // email.sendErrorRerportEmail(serviceName, err.message || "Err")
                    connection.end();
                }
            }
        }
    }
}
module.exports = sqlDb();
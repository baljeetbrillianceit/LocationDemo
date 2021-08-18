(function () {
    'use strict';

     var responseBack = {

       successHandler: function (res, next, message) {
            if(res == undefined || res == null) {
                return
            }
           res.status(200).send({
               "status": 1,
               "response": message || ""
           });
           res.end();

        },
        errorHandler: function (res, next, message) {
            if(res == undefined || res == null) {
                return
            }
            res.status(200).send({
                "status": 0,
                "response": message
            });
            res.end();

        }        
    };
    module.exports = responseBack;
})();    

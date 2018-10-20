/**
 * Created by rohit on 20/10/18.
 */

(function () {
    "use strict";
    const nats = require("./client/natsConnect");

    nats.subscribeAndReply("requestAndReply").then(body => {
        console.log("rcvd body requestAndReply => ", body);
    });

    nats.subscribeToSubject("fireAndForget").then(body => {
        console.log("rcvd body fireAndForget => ", body);
    });

})();
/**
 * Created by rohit on 20/10/18.
 */

(function () {
    "use strict";
    let NATS = require("nats");
    let t = console;
    let port = process.env.NATS_PORT || 4222;
    let token = process.env.NATS_TOKEN || 'mytoken';
    let url = process.env.NATS_URL || 'nats://demo.nats.io';

    let nc;
    class NatsConnect {
        constructor () {
            t.log("connecting...");
            nc = NATS.connect({url: `${url}:${port}`, token: token});
            t.log("connected!!");
        }
    }

    NatsConnect.prototype.subscribeToSubject = (subject) => {
        return new Promise((resolve, reject)=> {
            nc.subscribe(subject, (message) => {
                resolve(message);
            });
        });
    };

    NatsConnect.prototype.subscribeAndReply = (subject) => {
        return new Promise((resolve, reject) => {
            nc.subscribe(subject, (message, reply) => {
                if (reply) {
                    nc.publish(reply, message);
                    resolve(message);
                } else {
                    resolve(message);
                }
            });
        });
    };

    NatsConnect.prototype.requestAndReply = (subject, message) => {
        return new Promise((resolve, reject) => {
            nc.requestOne(subject, message, (reply) => {
                resolve(reply);
            });
        });
    };

    NatsConnect.prototype.fireAndForget = (subject, message) => {
        return new Promise((resolve, reject) => {
            /*nc.publish(subject, message, (result) => {
                resolve(result);
            });*/
            resolve(nc.publish(subject, message));
        });
    };

    module.exports = new NatsConnect();
})();
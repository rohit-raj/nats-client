/**
 * Created by rohit on 20/10/18.
 */

(function () {
    "use strict";
    let NATS = require("nats");
    let t = console;
    let port = process.env.NATS_PORT || 4222;
    let token = process.env.NATS_TOKEN || 'mytoken';
    let user = process.env.NATS_USER || '';
    let pass = process.env.NATS_PASS || '';
    let url = process.env.NATS_URL || 'nats://demo.nats.io';

    let nc;
    class NatsConnect {
        constructor () {
            t.log("connecting...");
            if(user && pass) {
                nc = NATS.connect({url: `${url}:${port}`, user: user, pass: pass});
            } else {
                nc = NATS.connect({url: `${url}:${port}`, token: token});
            }
            t.log("connected!!");
        }

        subscribeToSubject (subject) {
            return new Promise((resolve, reject)=> {
                nc.subscribe(subject, (message) => {
                    resolve(message);
                });
            });
        }

        subscribeAndReply (subject) {
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
        }

        requestAndReply (subject, message) {
            return new Promise((resolve, reject) => {
                nc.requestOne(subject, message, (reply) => {
                    resolve(reply);
                });
            });
        }

        fireAndForget (subject, message) {
            return new Promise((resolve, reject) => {
                resolve(nc.publish(subject, JSON.stringify(message)));
            });
        }
    }

    module.exports = new NatsConnect();
})();
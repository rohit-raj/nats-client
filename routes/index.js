/**
 * Created by rohit on 20/10/18.
 */

const express = require('express');
const router = express.Router();

const nats = require("../client/natsConnect");


/* GET users listing. */
router.get('/fireAndForget/:id', function(req, res) {
    let body = req.params.id;

    nats.fireAndForget('fireAndForget', body).then(resp => {
        console.log("response ack => ", resp);
        res.send("ok");
    });
});

router.get('/requestAndReply/:id', function(req, res) {
    let body = req.params.id;

    nats.requestAndReply('requestAndReply', body).then(resp => {
        console.log("requestAndReply ack => ", resp);
        res.send(resp);
    });
});

router.post('/sendBody', function(req, res) {
    console.log("sendBody");
    let body = req.body;

    nats.fireAndForget('sendBody', body).then(resp => {
        console.log("response ack => ", resp);
        res.send("ok");
    });
});

module.exports = router;

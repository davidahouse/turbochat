var TurboChat = require('../lib/TurboChat.js');
var DefaultColloquy = require('./defaultColloquy.js');
var PropertyColloquy = require('./propertyColloquy.js');

console.log('--- setting configuration');
var statusColloquy = new PropertyColloquy("status");

var colloquies = {"default": new DefaultColloquy("secondary-hyperdrive"),
                  "status": statusColloquy
};
var thing1cfg = {"slack": {"token": process.env.THING1_SLACK_TOKEN},
                 "slack-name": "secondary-hyperdrive",
                 "colloquies": colloquies};

console.log('--- creating turbochat object');
var thing1 = new TurboChat(thing1cfg);

statusColloquy.value = "Online!";

console.log('--- starting');
thing1.start();

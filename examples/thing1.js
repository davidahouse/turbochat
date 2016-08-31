var TurboChat = require('../lib/TurboChat.js');
console.log('thing1 starting');
var thing1cfg = {"name": "thing1",
                 "knowledge": [],
                 "attributes": [{"kind":"computer"}],
                 "actions": ["scan"],
                 "slack": {"token": process.env.THING1_SLACK_TOKEN}};
var thing1 = new TurboChat(thing1cfg);
thing1.start();

var TurboChat = require('../lib/TurboChat.js');
console.log('thing3 starting');
var thing1cfg = {"name": "thing3",
                 "knowledge": ["loose", "scanner"],
                 "attributes": [{"kind":"creature"}],
                 "actions": ["capture"],
                 "slack": {"token": process.env.THING3_SLACK_TOKEN}};
var thing3 = new TurboChat(thing1cfg);
thing3.start();

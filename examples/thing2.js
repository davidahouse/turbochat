var TurboChat = require('../lib/TurboChat.js');
console.log('thing2 starting');
var thing1cfg = {"name": "thing2",
                 "knowledge": ["active"],
                 "attributes": [{"kind":"scanner"}],
                 "actions": ["deactivate"],
                 "slack": {"token": process.env.THING2_SLACK_TOKEN}};
var thing2 = new TurboChat(thing1cfg);
thing2.start();

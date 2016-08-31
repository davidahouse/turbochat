var TurboChat = require('../lib/TurboChat.js');
console.log('starting');
var thing1cfg = {"name": "thing1",
                 "knowledge": ["trigger1", "trigger2"],
                 "attributes": [{"opt1":"A","opt2":"B"}],
                 "actions": ["talk"],
                 "slack": {"token": process.env.SLACK_TOKEN}};
var thing1 = new TurboChat(thing1cfg);
console.log(thing1);
console.log(thing1.getKnowledge());
thing1.start();
//console.log(thing1.test('what is your name?'));

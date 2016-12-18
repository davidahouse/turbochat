var TurboChat = require('../lib/TurboChat.js');

console.log('--- setting configuration');
var colloquies = {"thing1": "./examples/thing1.colloquy"};
var thing1cfg = {"slack": {"token": process.env.THING1_SLACK_TOKEN},
                 "slack-name": "secondary-hyperdrive",
                 "colloquies": colloquies};

console.log('--- creating turbochat object');
var thing1 = new TurboChat(thing1cfg);

thing1.prototype = {
  openDoor: function() {
    return "got the callback to open the door";
  }
}

console.log('--- starting');
thing1.start();

// console.log('thing1 starting');
// var thing1 = new TurboChat(thing1cfg);
// thing1.start();

// yaml = require('js-yaml');
// fs = require('fs');
//
// try {
//   var doc = yaml.safeLoad(fs.readFileSync('./examples/thing1.interface', 'utf8'));
//   console.log(doc);
// } catch (e) {
//   console.log(e);
// }

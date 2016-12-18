yaml = require('js-yaml');
fs = require('fs');

module.exports = TurboChatColloquy;

var dialogues = [];

function TurboChatColloquy(colloquies) {

  console.log('--- loading colloquies');
  for (var key in colloquies) {
    if (colloquies.hasOwnProperty(key)) {
      var file = colloquies[key];
      try {
        var contents = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
        for (var i = 0; i < contents.length; i++) {
          dialogues.push(contents[i]);
          console.log('--- parsed dialog ' + contents[i]);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}

TurboChatColloquy.prototype.dialogues = function() {
  return dialogues;
}

TurboChatColloquy.prototype.dialogForName = function(name) {
  for (var i = 0; i < dialogues.length; i++) {
    var dialog = dialogues[i];
    if (dialog["name"] === name) {
      return dialog
    }
  }
  return null;
}

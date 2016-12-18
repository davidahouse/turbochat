yaml = require('js-yaml');
fs = require('fs');

module.exports = TurboChatColloquy;

function TurboChatColloquy(colloquyFile) {

  console.log('--- loading colloquies');
  this.dialogues = [];
    try {
      var contents = yaml.safeLoad(fs.readFileSync(colloquyFile, 'utf8'));
      for (var i = 0; i < contents.length; i++) {
        this.dialogues.push(contents[i]);
        console.log('--- parsed dialog ' + contents[i]);
      }
    } catch (e) {
      console.log(e);
    }
}

TurboChatColloquy.prototype.dialogues = function() {
  return this.dialogues;
}

TurboChatColloquy.prototype.dialogForName = function(name) {
  for (var i = 0; i < this.dialogues.length; i++) {
    var dialog = this.dialogues[i];
    if (dialog["name"] === name) {
      return dialog
    }
  }
  return null;
}

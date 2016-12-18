var TurboChatColloquy = require('../lib/TurboChatColloquy.js');

module.exports = PropertyColloquy;

function PropertyColloquy(property) {

  this.property = property;
  this.value = "";

  var colloquy = new TurboChatColloquy("./examples/property.colloquy");
  this.dialogues = colloquy.dialogues;
  this.classifierData = {"property": property};
}

PropertyColloquy.prototype.onValue = function() {
  return 'The ' + this.property + ' is ' + this.value;
}

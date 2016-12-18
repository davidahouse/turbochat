var TurboChatColloquy = require('../lib/TurboChatColloquy.js');

module.exports = DefaultColloquy;

function DefaultColloquy(name) {

  this.name = name;
  var colloquy = new TurboChatColloquy("./examples/default.colloquy");
  this.dialogues = colloquy.dialogues;
  this.classifierData = {"name": name};
}

DefaultColloquy.prototype.onName = function() {
  return "My name is " + this.name;
}

DefaultColloquy.prototype.onHelp = function() {
  return "Help yourself!";
}

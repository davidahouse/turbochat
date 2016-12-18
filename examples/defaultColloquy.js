module.exports = DefaultColloquy;

function DefaultColloquy(name) {

  this.name = name;
  this.colloquyFile = "./examples/defailt.colloquy";
  this.classifierData = {"name": name};
}

DefaultColloquy.prototype.onName = function() {
  return "My name is " + this.name;
}

DefaultColloquy.prototype.onHelp = function() {
  return "Help yourself!";
}

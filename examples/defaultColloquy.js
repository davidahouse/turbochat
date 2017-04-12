module.exports = DefaultColloquy;

function DefaultColloquy(name) {

  this.name = name;
  this.colloquyFile = "./examples/default.colloquy";
  this.classifierData = {"name": name};
}

DefaultColloquy.prototype.onName = function() {
  return "My name is " + this.name;
}

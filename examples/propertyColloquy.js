module.exports = PropertyColloquy;

function PropertyColloquy(property) {

  this.property = property;
  this.value = "";
  this.colloquyFile = "./examples/property.colloquy";
  this.classifierData = {"property": property};
}

PropertyColloquy.prototype.onValue = function() {
  return 'The ' + this.property + ' is ' + this.value;
}

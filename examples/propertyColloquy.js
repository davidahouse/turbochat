module.exports = PropertyColloquy;

function PropertyColloquy(property) {

  this.property = property;
  this.value = "";
  this.colloquyFile = "./examples/property.colloquy";
  this.classifierData = {"property": property};
  this.responseData = {"property": property, "value": ""};
}

PropertyColloquy.prototype.setValue = function(value) {
  this.value = value;
  this.responseData["value"] = this.value;
}

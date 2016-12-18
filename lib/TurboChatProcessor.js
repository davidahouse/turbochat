var NLP = require('natural');

module.exports = TurboChatProcessor;

function TurboChatProcessor(colloquy) {

  console.log('creating processor');
  this.classifier = new NLP.LogisticRegressionClassifier();
  this.minConfidence = 0.7;
  this.dialogues = colloquy.dialogues();
}

TurboChatProcessor.prototype.teach = function() {

  console.log('--- teaching processor');
  for (var i = 0; i < this.dialogues.length; i++) {
    var dialog = this.dialogues[i];
    console.log('... dialog name ' + dialog["name"]);

    for (var j = 0; j < dialog["listen"].length; j++) {
      this.classifier.addDocument(dialog["listen"][j], dialog["name"]);
    }
  }
  this.classifier.train();
}

TurboChatProcessor.prototype.process = function(message) {

  var guesses = this.classifier.getClassifications(message.toLowerCase());
  var guess = guesses.reduce(toMaxValue);
  return {
    probabilities: guesses,
    guess: guess.value > this.minConfidence ? guess.label : null
  };
}

function toMaxValue(x, y) {
  
  return x && x.value > y.value ? x : y;
}

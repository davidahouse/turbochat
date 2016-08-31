var NLP = require('natural');

module.exports = TurboChatProcessor;

function TurboChatProcessor(configuration) {
  console.log('creating processor');
  this.classifier = new NLP.LogisticRegressionClassifier();
  this.minConfidence = 0.7;
}

TurboChatProcessor.prototype.teach = function() {
  console.log('teaching processor');
  this.classifier.addDocument('what is your name?', 'Name');
  this.classifier.addDocument('tell me your name', 'Name');
  this.classifier.addDocument('your name?', 'Name');

  // TODO: need to add in the dynamic generation of phrases using knowledge,
  // actions and attributes
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
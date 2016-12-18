var NLP = require('natural');
var handlebars = require('handlebars');
var TurboChatColloquy = require('./TurboChatColloquy.js');

module.exports = TurboChatProcessor;

function TurboChatProcessor(configuration) {

  console.log('creating processor');
  this.classifier = new NLP.LogisticRegressionClassifier();
  this.minConfidence = 0.7;
  this.configuration = configuration;
}

TurboChatProcessor.prototype.teach = function() {

  console.log('--- teaching processor');
  var colloquies = this.configuration["colloquies"];
  for (key in colloquies) {
    if (colloquies.hasOwnProperty(key)) {
      var colloquy = colloquies[key];
      trainColloquy(colloquy, this.classifier);
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

function trainColloquy(colloquy, classifier) {

  var colloquyFile = colloquy.colloquyFile;

  var colloquyData = new TurboChatColloquy(colloquyFile);
  var dialogues = colloquyData.dialogues;
  console.log('... ' + key + ' ' + dialogues);
  for (var i = 0; i < dialogues.length; i++) {
    var dialog = dialogues[i];
    for (var j = 0; j < dialog["listen"].length; j++) {

      // transform the text using handlebars
      var listen = dialog["listen"][j];
      var template = handlebars.compile(listen);
      var fullListen = template(colloquy.classifierData);

      classifier.addDocument(fullListen, key + "." + dialog["name"]);
    }
  }
}

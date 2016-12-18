var NLP = require('natural');
var handlebars = require('handlebars');

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
      var dialogues = colloquy.dialogues;
      console.log('... ' + key + ' ' + dialogues);
      for (var i = 0; i < dialogues.length; i++) {
        var dialog = dialogues[i];
        for (var j = 0; j < dialog["listen"].length; j++) {

          // transform the text using handlebars
          var listen = dialog["listen"][j];
          var template = handlebars.compile(listen);
          var fullListen = template(colloquy.classifierData);

          this.classifier.addDocument(fullListen, key + "." + dialog["name"]);
        }
      }
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

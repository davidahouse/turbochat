module.exports = TurboChat;

var TurboChatProcessor = require('./TurboChatProcessor.js');
var TurboChatInterface = require('./TurboChatInterface.js');
var TurboChatColloquy = require('./TurboChatColloquy.js');

function TurboChat(configuration) {
  console.log('turbo chat constructor');
  console.log(configuration);

  // this.name = configuration["name"];
  // this.knowledge = configuration["knowledge"];
  // this.actions = configuration["actions"];
  // this.attributes = configuration["attributes"];
  this.colloquies = configuration["colloquies"];
  this.processor = new TurboChatProcessor(configuration);
  this.interface = new TurboChatInterface(configuration);
}

TurboChat.prototype.getKnowledge = function() {
  return this.knowledge;
}

TurboChat.prototype.getActions = function() {
  return this.actions;
}

TurboChat.prototype.getAttributes = function() {
  return this.attributes;
}

TurboChat.prototype.start = function() {
  // train neural network with full list of phrases
  this.processor.teach();
  // // create slack bot integration
  this.interface.connect();
  this.interface.listen(function(speech,message) {
    console.log('--- message: ' + message.text);
    var response = this.processor.process(message.text);
    console.log('--- ' + JSON.stringify(response, null, 4));
    var guess = response["guess"];
    console.log('--- guess: ' + guess);

    if (guess != null && guess.indexOf('.') > 0) {
      var parts = guess.split('.');
      if (this.colloquies.hasOwnProperty(parts[0])) {
        var colloquy = this.colloquies[parts[0]];
        console.log('... ' + JSON.stringify(colloquy, null, 4));
        var callbackResponse = colloquy[parts[1]](message.text);
        if (callbackResponse) {
          this.interface.reply(message, callbackResponse);
        }
      }
    } else {
      this.interface.reply(message, 'I did not understand ' + guess);
    }
  }.bind(this));
}

TurboChat.prototype.send = function(message) {
  this.interface.send(message);
}

TurboChat.prototype.send_to = function(message, user) {
  this.interface.send_to(message, user);
}

TurboChat.prototype.broadcast = function(message) {
  this.interface.broadcast(message);
}

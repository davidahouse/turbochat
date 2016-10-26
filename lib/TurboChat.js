module.exports = TurboChat;

var TurboChatProcessor = require('./TurboChatProcessor.js');
var TurboChatInterface = require('./TurboChatInterface.js');

function TurboChat(configuration) {
  console.log('turbo chat constructor');
  console.log(configuration);
  this.name = configuration["name"];
  this.knowledge = configuration["knowledge"];
  this.actions = configuration["actions"];
  this.attributes = configuration["attributes"];
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
  // create slack bot integration
  this.interface.connect();
  this.interface.listen(function(speech,message) {
    console.log('message: ' + message.text);
    var response = this.processor.process(message.text);
    var guess = response["guess"];
    console.log('guess: ' + guess);

    // TODO: Need to process the response and decide what to do. Options might be:
    // Reply with some knowledge detail
    // Reply with some attribute detail
    // Reply with name of action
    // Perform an action
    // Process a knowledge update from another bot and store into our global knowledge and
    //    potentially callback to our creator for further processing

    if (guess === "Name") {
      this.interface.reply(message, 'My name is ' + this.name);
    } else if (this.actions.includes(guess)) {
      console.log("OWN PROPS: " + Object.getOwnPropertyNames(this));
      var botResponse = this.prototype[guess](message.text);
      for (var j = 0; j < botResponse.length; j++) {
        this.interface.reply(message, botResponse[j]);
      }
    } else if (guess in this.knowledge) {
      this.interface.reply(message, 'My ' + guess + ' is ' + this.knowledge[guess]);
    } else {
      // TODO: Catch all when it doesn't understand. Maybe we could implement a help command and recommend it here.
      this.interface.reply(message, 'I have no idea about ' + guess);
    }
  }.bind(this));
}

TurboChat.prototype.send = function(message) {
  this.interface.send(message);
}

TurboChat.prototype.send_to = function(message, user) {
  this.interface.send_to(message, user);
}

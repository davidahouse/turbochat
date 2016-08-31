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
    console.log('speech: ' + speech + ' message: ' + message);
    var response = this.processor.process(message.text);
    console.log('response: ' + response["guess"]);

    // TODO: Need to process the response and decide what to do. Options might be:
    // Reply with some knowledge detail
    // Reply with some attribute detail
    // Reply with name of action
    // Perform an action
    // Process a knowledge update from another bot and store into our global knowledge and
    //    potentially callback to our creator for further processing
    if (response["guess"] === "Name") {
      this.interface.reply(message, 'My name is ' + this.name);
    } else {
      // TODO: Catch all when it doesn't understand. Maybe we could implement a help command and recommend it here.
      this.interface.reply(message, 'I have no idea');
    }
  }.bind(this));
}

// TODO: Just a temp function for testing.
TurboChat.prototype.test = function(message) {
  return this.processor.process(message);
}

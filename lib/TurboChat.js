var TurboChatProcessor = require('./TurboChatProcessor.js');
var TurboChatInterface = require('./TurboChatInterface.js');
var TurboChatColloquy = require('./TurboChatColloquy.js');
var handlebars = require('handlebars');

module.exports = TurboChat;

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
  this.analysis = false;
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

TurboChat.prototype.start = function(onReply) {
  // train neural network with full list of phrases
  this.processor.teach();
  // // create slack bot integration
  this.interface.connect();
  this.interface.listen(function(speech,message) {
    console.log('--- message: ' + message.text);

    // Check for Analysis keyword
    if (message.text.toLowerCase().endsWith("analysis")) {
      this.analysis = true;
      this.interface.reply(message, "... stares into the distance ...");
      return;
    }

    // Process the text with the NLP
    var response = this.processor.process(message.text);
    console.log('--- ' + JSON.stringify(response, null, 4));
    var guess = response["guess"];
    console.log('--- guess: ' + guess);

    // If in analyis mode, just return the probabilities
    if (this.analysis == true) {

      var probabilities = response["probabilities"];
      for ( var i = 0; i < probabilities.length; i++ ) {
        var guess = probabilities[i];
        var pct = parseInt(parseFloat(guess["value"]) * 100.0);
        this.interface.reply(message, guess["label"] + " (" + pct + "%)");
      }
      this.analysis = false;
      return;
    }

    // If we have a guess, find the colloquy object it is associated
    // with and make the appropriate callback for a response.
    var reply = null;
    if (guess != null) {

      if (guess.indexOf('#') > 0) {
        var parts = guess.split('#');
        if (this.colloquies.hasOwnProperty(parts[0])) {
          var colloquy = this.colloquies[parts[0]];
          //console.log('... ' + JSON.stringify(colloquy, null, 4));

          // Here is the part where we just try to call a method on the colloquy
          // object based on the guess.
          if (typeof colloquy[parts[1]] === "function") {
            var callbackResponse = colloquy[parts[1]](message.text);
            if (callbackResponse) {
              reply = callbackResponse;
            }
          } else {
            console.log('... dont have a function for ' + parts[1]);

            // If our colloquy has a responseData property, attempt to use it
            // and the template engine. Otherwise just return the raw text.
            var responseData = colloquy.responseData;
            if ( responseData != null ) {
              var template = handlebars.compile(parts[1]);
              console.log('... building reply using ' + JSON.stringify(responseData, null, 4));
              reply = template(responseData);
            } else {
              reply = parts[1];
            }
          }
        }
      } else {
        reply = guess;
      }
    } else {
      reply = 'I did not understand "' + message.text + '"';
    }

    if (reply != null) {
      if (typeof onReply === "function") {
        onReply(message, reply);
      }
      this.interface.reply(message, reply);
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

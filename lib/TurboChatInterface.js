var BotKit = require('botkit');

module.exports = TurboChatInterface;

var Bot = BotKit.slackbot({
  debug: false,
  storage: undefined
});

function TurboChatInterface(configuration) {
  console.log('creating interface');
  this.scopes = [
    'direct_mention',
    'direct_message',
    'mention'
  ];
  this.token = configuration["slack"]["token"];
}

TurboChatInterface.prototype.connect = function() {
  console.log('interface connecting');
  console.log('token: ' + this.token);
  this.bot = Bot.spawn({
    token: this.token
  }).startRTM();
}

TurboChatInterface.prototype.listen = function(callback) {
  Bot.hears('.*', this.scopes, callback);
}

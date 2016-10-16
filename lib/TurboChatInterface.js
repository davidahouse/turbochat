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

var fullChannelList = [];
var fullUserList = [];

TurboChatInterface.prototype.connect = function() {
  console.log('interface connecting');
  console.log('token: ' + this.token);
  this.bot = Bot.spawn({
    token: this.token
  }).startRTM(function(err, bot) {
    if (err) {
      console.log('start rtm error ' + err);
    } else {
      console.log('start rtm finished!');

      bot.api.users.list({}, function (err, response) {
              if (response.hasOwnProperty('members') && response.ok) {
                  var total = response.members.length;
                  for (var i = 0; i < total; i++) {
                      var member = response.members[i];
                      console.log('member: ' + member.name);
                      fullUserList.push({name: member.name, id: member.id});
                  }
              }
          });

      // grab all the channels so we can use them later
      bot.api.channels.list({}, function (err, response) {
        if (response.hasOwnProperty('channels') && response.ok) {
            var total = response.channels.length;
            for (var i = 0; i < total; i++) {
                var channel = response.channels[i];
                fullChannelList.push({name: channel.name, id: channel.id});
            }
        }
      });
    }
  });
}

TurboChatInterface.prototype.listen = function(callback) {
  Bot.hears('.*', this.scopes, callback);
}

TurboChatInterface.prototype.reply = function(message, response) {
  this.bot.reply(message, response);
}

TurboChatInterface.prototype.send = function(message, user) {

  for (var i = 0; i < fullChannelList.length; i++) {
    var channel = fullChannelList[i];
    this.bot.say(
      {
        text: message,
        channel: channel.id // a valid slack channel, group, mpim, or im ID
      }
    );
  }
}

TurboChatInterface.prototype.send_to = function(text, user) {

  for (var j = 0; j < fullUserList.length; j++) {
    var member = fullUserList[j];
    if (member.name == user) {
      var message = "<@" + member.id + "|" + member.name + "> " + text;
      for (var i = 0; i < fullChannelList.length; i++) {
        var channel = fullChannelList[i];
        this.bot.say(
          {
            text: message,
            channel: channel.id // a valid slack channel, group, mpim, or im ID
          }
        );
      }
    }
  }
}

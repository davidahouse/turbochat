var nlp = require('nlp_compromise');

var nameResponses = ["My name is The Kid!", "They call me The Kid", "The Kid"];
var likeResponses = ["I like you too", "You aren't bad for a human", "Yes but do you like, like me?"];
var unknownResponses = ["Huh?", "I didn't understand you", "What did you say?", "Try again", "What?", "Where did you learn to type?"];

var turboChatResponder = function (message) {

  var sentence = nlp.text(message);

  var terms = sentence.terms();
  console.log('sentence terms!' + terms.length);
  terms.forEach(function(term) {
    console.log('term: ' + term.constructor.name + ' ' + term.root() + ' ' + term.tag);
  });

  // if `a question`, `has a possessive term of your`, `has a verb/noun/adjective of name`
  // respond with our name
  if ( sentenceIsQuestion(sentence) && tagFollowedByWord(sentence, 'Possessive', 'name') ) {
    return randomResponse(nameResponses);
  } else if ( termFollowedByWord(sentence, 'Verb', 'you' ) ) {
    return randomResponse(likeResponses);
  } else {
    return randomResponse(unknownResponses);
  }
};

function sentenceIsQuestion(sentence) {
  var terms = sentence.terms();
  var found = false;
  terms.forEach(function(term) {
    if (term.tag == `Question`) {
      found = true;
    }
  });
  return found;
};

function termFollowedByWord(sentence, term, word) {
  var terms = sentence.terms();
  var found = false;
  for ( i = 0; i < terms.length; i++ ) {
    if ( terms[i].constructor.name == term ) {
      if ( i < (terms.length - 1) ) {
        if ( terms[i+1].root() == word ) {
          found = true;
        }
      }
    }
  }
  return found;
};

function tagFollowedByWord(sentence, tag, word) {
  var terms = sentence.terms();
  var found = false;
  for ( i = 0; i < terms.length; i++ ) {
    if ( terms[i].tag == tag ) {
      if ( i < (terms.length - 1) ) {
        if ( terms[i+1].root() == word ) {
          found = true;
        }
      }
    }
  }
  return found;
};

function randomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
};

module.exports = turboChatResponder;

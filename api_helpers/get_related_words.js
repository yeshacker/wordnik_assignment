'use strict';

var config = require('config');
var request = require('request');

/**
 * Gets related words i.e. synonyms, antonyms of a word
 * @param  {[type]} word                     [Word to fetch relationships for]
 * @param  {[type]} useCanonical             [If true will try to return the correct word root ('cats' -> 'cat'). If false returns exactly what was requested.]
 * @param  {[type]} relationshipTypes        [Limits the total results per type of relationship type]
 * @param  {[type]} limitPerRelationshipType [Restrict to the supplied relationship types]
 * @param  {function} next                   [callback]
 */

var getRelatedWords = function(word, useCanonical, relationshipTypes, limitPerRelationshipType, next) {
  var _params, _paramsKeys, apiKey, queryString = '';

  _params = {
    'useCanonical': arguments[1] || '200',
    'relationshipTypes': arguments[2],
    'limitPerRelationshipType': arguments[3] || '10'
  };

  apiKey = config.get('wordnik.api_key');

  _paramsKeys = Object.keys(_params);
  _paramsKeys.forEach( function(_paramsKey, index) {
    queryString += ((index == 0) ? '?api_key=' + apiKey + '&' : '&') + _paramsKey + '=' + _params[_paramsKey];
  });

  request({
    method: 'GET',
    uri: 'http://api.wordnik.com/v4/word.json/'+ word +'/relatedWords' + queryString,
  }, function(error, response, body) {
    var dataObjArr = JSON.parse(body);

    if (!next && (dataObjArr.length > 0)) {
      dataObjArr.forEach(function(dataObj) {
        var relationshipType = dataObj.relationshipType.replace(/(^[a-z]| [a-z]|-[a-z])/g,
          function($1){
              return $1.toUpperCase();
          });

        console.info(relationshipType + '(s)');
        var words = dataObj.words;
        words.forEach(function(word, index) {
          console.info('++', ++index + '.', word);
        });
      });
    }

    if ((typeof next === 'function') && dataObjArr.length ) {
      next(null, dataObjArr[0].words);
    }
  });
}

module.exports = getRelatedWords;

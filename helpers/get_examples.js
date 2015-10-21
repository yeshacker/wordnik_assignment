'use strict';

var config = require('config');
var request = require('request');

/**
 * Gets examples of a word from Wordnik API
 * @param  {String} word                  [Word to return examples for]
 * @param  {String} includeDuplicates     [Show duplicate examples from different sources]
 * @param  {String} useCanonical          [If true will try to return the correct word root ('cats' -> 'cat'). If false returns exactly what was requested.]
 * @param  {int}    skip                  [Results to skip]
 * @param  {int}    limit                 [Maximum number of results to return]
 * @return {json}                         [Returns examples]
 */
var getExamples = function(word, includeDuplicates, useCanonical, skip, limit) {
  var _params, _paramsKeys, api_key, queryString = '';

  _params = {
    'includeDuplicates': arguments[1],
    'useCanonical': arguments[2],
    'skip': arguments[3] || '0',
    'limit': arguments[4] || '5',
  };

  api_key = config.get('wordnik.api_key');

  _paramsKeys = Object.keys(_params);
  _paramsKeys.forEach( function(_paramsKey, index) {
    queryString += ((index == 0) ? '?api_key=' + api_key + '&' : '&') + _paramsKey + '=' + _params[_paramsKey];
  });

  request({
    method: 'GET',
    uri: 'http://api.wordnik.com/v4/word.json/'+ word +'/examples' + queryString,
  }, function(error, response, body) {
    console.log(body);
  });
}

module.exports = getExamples;

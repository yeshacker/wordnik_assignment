'use strict';

var config = require('config');
var request = require('request');

/**
 * Gets definitions of a word
 * @param  {string} word               [Word to return definitions for]
 * @param  {int}    limit              [Maximum number of results to return]
 * @param  {string} partOfSpeech       [CSV list of part-of-speech types]
 * @param  {string} includeRelated     [Return related words with definitions]
 * @param  {string} sourceDictionaries [Source dictionary to return definitions from. If 'all' is received, results are returned from all sources. If multiple values are received (e.g. 'century,wiktionary'), results are returned from the first specified dictionary that has definitions. If left blank, results are returned from the first dictionary that has definitions. By default, dictionaries are searched in this order: ahd, wiktionary, webster, century, wordnet]
 * @param  {string} useCanonical       [If true will try to return the correct word root ('cats' -> 'cat'). If false returns exactly what was requested.]
 * @param  {string} includeTags        [Return a closed set of XML tags in response]
 * @return {json}                      [Returns definitions for a word]
 */
var getDefinitions = function(word, limit, partOfSpeech, includeRelated, sourceDictionaries, useCanonical, includeTags) {
  var _params, _paramsKeys, apiKey, queryString = '';

  _params = {
    'limit': arguments[1] || '200',
    'partOfSpeech': arguments[2],
    'includeRelated': arguments[3],
    'sourceDictionaries': arguments[4],
    'useCanonical': arguments[5] || 'false',
    'includeTags': arguments[6] || 'false'
  };

  apiKey = config.get('wordnik.api_key');

  _paramsKeys = Object.keys(_params);
  _paramsKeys.forEach( function(_paramsKey, index) {
    queryString += ((index == 0) ? '?api_key=' + apiKey + '&' : '&') + _paramsKey + '=' + _params[_paramsKey];
  });

  request({
    method: 'GET',
    uri: 'http://api.wordnik.com/v4/word.json/'+ word +'/definitions' + queryString,
  }, function(error, response, body) {
    console.log(body);
  });
}

module.exports = getDefinitions;

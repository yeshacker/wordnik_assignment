'use strict';

var config = require('config');
var request = require('request');

/**
 * Get random words
 * @param  {Boolean}  hasDictionaryDef    [Only return words with dictionary definitions]
 * @param  {String}   includePartOfSpeech [CSV part-of-speech values to include]
 * @param  {String}   excludePartOfSpeech [CSV part-of-speech values to exclude]
 * @param  {Int}      minCorpusCount      [Minimum corpus frequency for terms]
 * @param  {Int}      maxCorpusCount      [Maximum corpus frequency for terms]
 * @param  {Int}      minDictionaryCount  [Minimum dictionary count]
 * @param  {Int}      maxDictionaryCount  [Maximum dictionary count]
 * @param  {Int}      minLength           [Minimum word length]
 * @param  {Int}      maxLength           [Maximum word length]
 // * @param  {Int}      sortBy              [Attribute to sort by]
 // * @param  {Int}      sortOrder           [Sort Direction]
 // * @param  {Int}      limit               [Maximum words to return]
 * @param  {function} next                [Callback to display results]
 */

var getRandomWords = function(hasDictionaryDef, includePartOfSpeech, excludePartOfSpeech, minCorpusCount, maxCorpusCount, minDictionaryCount, maxDictionaryCount, minLength, maxLength,
  // sortBy, sortOrder, limit,
next) {
  var _params, _paramsKeys, apiKey, queryString = '';

  _params = {
    hasDictionaryDef: arguments[0] || 'false',
    includePartOfSpeech: arguments[1],
    excludePartOfSpeech: arguments[2],
    minCorpusCount: arguments[3] || '0',
    maxCorpusCount: arguments[4] || '-1',
    minDictionaryCount: arguments[5] || '1',
    maxDictionaryCount: arguments[6] || '-1',
    minLength: minLength || '5',
    maxLength: maxLength || '-1'
    // sortBy: sortBy,
    // sortOrder: sortOrder,
    // limit: limit || 10
  };

  apiKey = config.get('wordnik.api_key');

  _paramsKeys = Object.keys(_params);
  _paramsKeys.forEach( function(_paramsKey, index) {
    if (!_params[_paramsKey]) return;
    queryString += ((index == 0) ? '?api_key=' + apiKey + '&' : '&') + _paramsKey + '=' + _params[_paramsKey];
  });

  request({
    method: 'GET',
    uri: 'http://api.wordnik.com/v4/words.json/randomWord' + queryString,
  }, function(error, response, body) {
    var dataObj = JSON.parse(body);

    if (typeof next === 'function') {
      next(null, dataObj.word); return;
    }

    console.info('Random word:', dataObj.word);
  });
}

module.exports = getRandomWords;

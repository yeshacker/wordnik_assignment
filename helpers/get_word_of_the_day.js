'use strict';

var config = require('config');
var request = require('request');

/**
 * Get Word of the day
 * @param  {date}     date             [Fetches by date in yyyy-MM-dd]
 * @param  {function} fnDisplayResults [callback to display word of the day]
 */

var getWordOfTheDay = function(date, fnDisplayResults) {
  var _params, _paramsKeys, apiKey, queryString = '';

  _params = {
    date: date,
  };

  apiKey = config.get('wordnik.api_key');

  _paramsKeys = Object.keys(_params);
  _paramsKeys.forEach( function(_paramsKey, index) {
    queryString += ((index == 0) ? '?api_key=' + apiKey + '&' : '&') + _paramsKey + '=' + _params[_paramsKey];
  });

  request({
    method: 'GET',
    uri: 'http://api.wordnik.com/v4/words.json/wordOfTheDay' + queryString,
  }, fnDisplayResults);
}

module.exports = getWordOfTheDay;

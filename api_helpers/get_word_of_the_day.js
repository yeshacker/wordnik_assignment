'use strict';

var config = require('config');
var request = require('request');

/**
 * Get Word of the day
 * @param  {date}     date             [Fetches by date in yyyy-MM-dd]
 * @param  {function} next             [callback]
 */

var getWordOfTheDay = function(date, next) {
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
  }, function(error, response, body) {
    var dataObj = JSON.parse(body);

    if (typeof next === 'function') {
      next(null, dataObj.word);
    }
    
    console.info('Word Of The Day');
    console.info('++', dataObj.word);

  });
}

module.exports = getWordOfTheDay;

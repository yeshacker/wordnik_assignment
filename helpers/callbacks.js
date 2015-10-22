module.exports = {
  // Callback to process and display word of the day
  fnDisplayWordOfTheDay: function(error, response, body) {
    var dataObj = JSON.parse(body);

    console.info('Word Of The Day');
    console.info('++', dataObj.word);
  },

  // Callback to process and display definitions
  fnDisplayDefinitions: function(error, response, body) {
    var dataObjArr = JSON.parse(body);

    console.info('Definition(s)');
    dataObjArr.forEach(function(dataObj, index) {
      console.info('++', ++index + '.', dataObj.text);
    });
  },

  // Callback to process and display synonyms and antonyms
  fnDisplayRelatedWords: function(error, response, body) {
    var dataObjArr = JSON.parse(body);
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
  },

  // Callback to process and display examples
  fnDisplayExamples: function(error, response, body) {
    var dataObjArr = JSON.parse(body);
    var examples = dataObjArr.examples;

    console.info('Example(s)');
    examples.forEach(function(example, index) {
      console.info('++', ++index + '.', example.text)
      console.info('++', 'Ref:', example.title);
    });
  }
}

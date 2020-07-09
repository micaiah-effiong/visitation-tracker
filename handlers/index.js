const qureyHandler = require("./advanceQuery");
const queryToSequelize = require("./queryToSequelize");
const pagination = require("./pagination");
const errorResponse = require("./error-response");

module.exports = {
  /*
   * @param {String} str
   * return string with first letter as capital
   * convert str to sentence case
   * toSentenceCase("foo") // "Foo"
   */
  toSentenceCase(str) {
    // to Sentence Case function
    return (
      str.toLowerCase().split("")[0].toUpperCase() + str.substr(1).toLowerCase()
    );
  },
  errorResponse,
  qureyHandler,
  queryToSequelize,
  pagination,
};

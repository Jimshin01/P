"use strict";

var space = " \u200C"; // Spaces

var underscore = "_"; // _

var dash = "-"; // -

var symbol1 = "\u060C"; // ،

var symbol2 = "\u061B"; // ؛

var symbol3 = "\u061F"; // ؟

var symbol4 = "\u066A%"; // %

var symbol5 = "\u066B,"; // ,

var symbol6 = "\u066C"; // !

var symbol7 = "\""; // "

var symbol8 = "'"; // "

var symbol9 = "("; // (

var symbol10 = ")"; // )

var symbol11 = "."; // .

var symbol12 = ":"; // :

var symbol13 = "?"; // ?

var symbols = "".concat(dash).concat(underscore).concat(symbol1).concat(symbol2).concat(symbol3).concat(symbol4).concat(symbol5).concat(symbol6).concat(symbol7).concat(symbol8).concat(symbol9).concat(symbol10).concat(symbol11).concat(symbol12).concat(symbol13);
var motions = "\u064B-\u0651"; // ً  ٌ  ٍ  َ	  ُ	  ِ	  ّ

var motionsList = ["َ", "ُ", "ِ", "ّ", "ً", "ٌ", "ٍ"];
var persianNumbers = "\u06F0-\u06F9"; // ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹

var arabicNumbers = "\u0660-\u0669"; // ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹

var persianNumbersList = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
var arabicNumbersList = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
var persian1 = "\u0621-\u0628"; // ء آ أ	ؤ	إ	ئ	ا ب

var persian2 = "\u062A-\u063A"; // ت  ث  ج  ح  خ  د  ذ  ر  ز  س  ش  ص  ض  ط  ظ  ع  غ

var persian3 = "\u0641-\u0642"; // ف  ق

var persian4 = "\u0644-\u0648"; // ل م ن ه و

var persian5 = "\u06CC\u064A\u0649"; // ی

var persian6 = "\u0655"; //  ٕ

var persian7 = "\u067E"; // پ

var persian8 = "\u0686"; // چ

var persian9 = "\u0698"; // ژ

var persian10 = "\u06A9\u0643"; // ک

var persian11 = "\u06AF"; // گ

var persian12 = "\u06BE\u06D5\u0629"; // ھ

var persianLetter = "".concat(persian1).concat(persian2).concat(persian3).concat(persian4).concat(persian5).concat(persian6).concat(persian7).concat(persian8).concat(persian9).concat(persian10).concat(persian11).concat(persian12);

var isPersianWithoutNumber = function isPersianWithoutNumber(str) {
  var reg = new RegExp("^[".concat(space).concat(persianLetter).concat(motions, "]*$"));
  return reg.test(str);
};

var isPersianWithsymbol = function isPersianWithsymbol(str) {
  var reg = new RegExp("^([".concat(persianLetter).concat(space).concat(symbols).concat(persianNumbers).concat(arabicNumbers).concat(motions, "]){2,}$"));
  return reg.test(str);
};

var isNumber = function isNumber(str) {
  var numberReg = new RegExp("^([0-9".concat(persianNumbers).concat(arabicNumbers, "]){1,}$"));
  return numberReg.test(str);
};

var isEmail = function isEmail(str) {
  var emailReg = new RegExp('^[a-zA-Z0-9._]{2,}[@]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}$');
  return emailReg.test(str);
};

var correctCharacters = function correctCharacters(str) {
  str = str.replaceAll("‌", " ");

  for (var i = 0; i < motionsList.length; i += 1) {
    str = str.replaceAll(motionsList[i], "");
  }

  for (var _i = 0; _i < 10; _i += 1) {
    str = str.replaceAll(persianNumbersList[_i], _i).replaceAll(arabicNumbersList[_i], _i);
  }

  return str.trim();
};

module.exports = {
  isPersianWithoutNumber: isPersianWithoutNumber,
  // isPersianWithsymbol,
  isNumber: isNumber,
  isEmail: isEmail,
  correctCharacters: correctCharacters
};
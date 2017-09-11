(function () {
  var UproxyI18n = (function () {
    var UproxyI18n = function () {
    };

    UproxyI18n.makeLookUpLanguage = function (availableLanguages, normalize) {
      normalize = normalize || String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);
      return function (language) {
        language = normalize(language);
        for (var availableLanguage of availableLanguages) {
          var parts = normalize(availableLanguage).split('-');
          while (parts.length) {
            var joined = parts.join('-');
            if (language === joined) {
              return availableLanguage;
            }
            parts.pop();
          }
        }
      };
    };

    UproxyI18n.getBestMatchingLanguage = function (available, preferred) {
      available = typeof available === 'function' ? available : UproxyI18n.makeLookUpLanguage(available);
      preferred = preferred || (typeof navigator === 'object' ?
        (navigator.languages || [navigator.language || navigator.browserLanguage]) : []);
      for (var i = 0; i < preferred.length; i++) {
        var candidate = preferred[i];
        var parts = candidate.split('-');
        while (parts.length) {
          var joined = parts.join('-');
          var closest = available(joined);
          if (closest) {
            return closest;
          }
          parts.pop();
        }
      }
    };

    return UproxyI18n;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = UproxyI18n;
  } else {
    window.UproxyI18n = UproxyI18n;
  }
})();

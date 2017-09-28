window.UproxyI18n = {
  makeLookUpLanguage: function(availableLanguages, normalize) {
    availableLanguages = Array.isArray(availableLanguages) ?
        availableLanguages :
        typeof availableLanguages.keys === 'function' ?
            availableLanguages.keys() :
            Object.keys(availableLanguages);
    normalize = normalize ||
        String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);
    return function(language) {
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
  },

  getBestMatchingLanguage: function(available, preferred) {
    available = typeof available === 'function' ?
        available :
        UproxyI18n.makeLookUpLanguage(available);
    preferred = preferred ||
        (typeof navigator === 'object' ?
             (navigator.languages ||
              [navigator.language || navigator.browserLanguage]) :
             []);
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
  }
};

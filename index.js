var toLowerCase = String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);
var nav = navigator;
var browserLanguages = (nav.languages || [nav.language]);
function makeLookUpLanguage(availableLanguages, normalize) {
    if (normalize === void 0) { normalize = toLowerCase; }
    return function (languageId) {
        languageId = normalize(languageId);
        var isNonEmptyArray = Array.isArray(availableLanguages) && availableLanguages.length > 0;
        var isFirstElementString = isNonEmptyArray && availableLanguages[0] instanceof String;
        var availableLanguageIds = isNonEmptyArray ? (isFirstElementString ? availableLanguages :
            availableLanguages.map(function (langObj) { return langObj.id; })) : Object.keys(availableLanguages);
        for (var _i = 0, availableLanguageIds_1 = availableLanguageIds; _i < availableLanguageIds_1.length; _i++) {
            var availableLanguageId = availableLanguageIds_1[_i];
            var parts = normalize(availableLanguageId).split('-');
            while (parts.length) {
                var joined = parts.join('-');
                if (languageId === joined) {
                    return availableLanguageId;
                }
                parts.pop();
            }
        }
    };
}
// tslint:disable-next-line:no-any
window.UproxyI18n = {
    getBestMatchingLanguage: function (available, preferred) {
        if (preferred === void 0) { preferred = browserLanguages; }
        var lookUpAvailable = typeof available === 'function' ?
            available : makeLookUpLanguage(available);
        for (var _i = 0, preferred_1 = preferred; _i < preferred_1.length; _i++) {
            var candidate = preferred_1[_i];
            var parts = candidate.split('-');
            while (parts.length) {
                var joined = parts.join('-');
                var closest = lookUpAvailable(joined);
                if (closest) {
                    return closest;
                }
                parts.pop();
            }
        }
    }
};
//# sourceMappingURL=index.js.map
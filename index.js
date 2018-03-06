"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toLowerCase = String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);
const nav = navigator;
const browserLanguages = (nav.languages || [nav.language]);
function makeLookUpLanguage(availableLanguages, normalize = toLowerCase) {
    return (languageId) => {
        languageId = normalize(languageId);
        const isNonEmptyArray = Array.isArray(availableLanguages) && availableLanguages.length > 0;
        const isFirstElementString = isNonEmptyArray && availableLanguages[0] instanceof String;
        const availableLanguageIds = isNonEmptyArray ? (isFirstElementString ? availableLanguages :
            availableLanguages.map((langObj) => langObj.id)) : Object.keys(availableLanguages);
        for (const availableLanguageId of availableLanguageIds) {
            const parts = normalize(availableLanguageId).split('-');
            while (parts.length) {
                const joined = parts.join('-');
                if (languageId === joined) {
                    return availableLanguageId;
                }
                parts.pop();
            }
        }
    };
}
exports.makeLookUpLanguage = makeLookUpLanguage;
function getBestMatchingLanguage(available, preferred = browserLanguages) {
    const lookUpAvailable = typeof available === 'function' ?
        available : makeLookUpLanguage(available);
    for (const candidate of preferred) {
        const parts = candidate.split('-');
        while (parts.length) {
            const joined = parts.join('-');
            const closest = lookUpAvailable(joined);
            if (closest) {
                return closest;
            }
            parts.pop();
        }
    }
}
exports.getBestMatchingLanguage = getBestMatchingLanguage;
//# sourceMappingURL=index.js.map
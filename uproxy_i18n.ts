type languageId = string;
type languageObj = {[id: string]: languageId};
type languages = languageId[] | languageObj[];
type normalizeFunc = (language: languageId) => languageId;
type languageLookup = (language: languageId) => languageId | undefined;

const toLowerCase = String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);
const browserLanguages: languageId[] = navigator.languages ||
    [navigator.language || (navigator as {browserLanguage?: languageId}).browserLanguage];

export const makeLookUpLanguage = (availableLanguages: languages, normalize = toLowerCase) => {
  return (language: languageId) => {
    language = normalize(language);
    for (const availableLanguage of availableLanguages) {
      const availableLanguageId = availableLanguage.hasOwnProperty('id') ? 
          (availableLanguage as languageObj).id : availableLanguage;
      const parts = normalize(availableLanguageId).split('-');
      while (parts.length) {
        const joined = parts.join('-');
        if (language === joined) {
          return availableLanguageId;
        }
        parts.pop();
      }
    }
  };
};

export const getBestMatchingLanguage = (
    available: languageLookup | languages,
    preferred = browserLanguages
) => {
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
};

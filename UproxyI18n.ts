export interface LanguageObj {
  id: string;
}
export type LanguageMap = {[id: string]: LanguageObj};
export type Languages = string[] | LanguageObj[] | LanguageMap;
export type LanguageLookup = (languageId: string) => string | undefined;

const toLowerCase = String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);

const nav = navigator;
const browserLanguages = (nav.languages || [nav.language]) as string[];

export function makeLookUpLanguage(availableLanguages: Languages, normalize = toLowerCase) {
  return (languageId: string): string | undefined => {
    languageId = normalize(languageId);
    const isNonEmptyArray = Array.isArray(availableLanguages) && availableLanguages.length > 0;
    const isFirstElementString = isNonEmptyArray && (
      availableLanguages as string[] | LanguageObj[])[0] instanceof String;
    const availableLanguageIds: string[] = isNonEmptyArray ? (
        isFirstElementString ? (availableLanguages as string[]) :
        (availableLanguages as LanguageObj[]).map((langObj) => langObj.id)
    ) : Object.keys(availableLanguages as LanguageMap);
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

export function getBestMatchingLanguage (
  available: LanguageLookup | Languages,
  preferred = browserLanguages
): string | undefined {
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

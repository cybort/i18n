interface LanguageObj {
    id: string;
}
declare type LanguageMap = {
    [id: string]: LanguageObj;
};
declare type Languages = string[] | LanguageObj[] | LanguageMap;
declare type LanguageLookup = (languageId: string) => string | undefined;
declare const toLowerCase: any;
declare const nav: Navigator;
declare const browserLanguages: string[];
declare function makeLookUpLanguage(availableLanguages: Languages, normalize?: any): (languageId: string) => string;

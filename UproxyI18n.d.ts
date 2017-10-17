export interface LanguageObj {
    id: string;
}
export declare type LanguageMap = {
    [id: string]: LanguageObj;
};
export declare type Languages = string[] | LanguageObj[] | LanguageMap;
export declare type LanguageLookup = (languageId: string) => string | undefined;
export declare function makeLookUpLanguage(availableLanguages: Languages, normalize?: any): (languageId: string) => string;
export declare function getBestMatchingLanguage(available: LanguageLookup | Languages, preferred?: string[]): string | undefined;

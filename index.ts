// Copyright 2018 The Outline Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

interface LanguageObj {
  id: string;
}
type LanguageMap = {[id: string]: LanguageObj};
type Languages = string[] | LanguageObj[] | LanguageMap;
type LanguageLookup = (languageId: string) => string | undefined;

const toLowerCase = String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);

const nav = navigator;
const browserLanguages = (nav.languages || [nav.language]) as string[];

function makeLookUpLanguage(availableLanguages: Languages, normalize = toLowerCase) {
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

// tslint:disable-next-line:no-any
(window as any).OutlineI18n = {
  getBestMatchingLanguage(
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
};

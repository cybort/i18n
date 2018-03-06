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
window.OutlineI18n = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQ0FBcUM7QUFDckMsRUFBRTtBQUNGLGtFQUFrRTtBQUNsRSxtRUFBbUU7QUFDbkUsMENBQTBDO0FBQzFDLEVBQUU7QUFDRixrREFBa0Q7QUFDbEQsRUFBRTtBQUNGLHNFQUFzRTtBQUN0RSxvRUFBb0U7QUFDcEUsMkVBQTJFO0FBQzNFLHNFQUFzRTtBQUN0RSxpQ0FBaUM7QUFTakMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXpGLElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztBQUN0QixJQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBYSxDQUFDO0FBRXZFLDRCQUE0QixrQkFBNkIsRUFBRSxTQUF1QjtJQUF2QiwwQkFBQSxFQUFBLHVCQUF1QjtJQUNoRixNQUFNLENBQUMsVUFBQyxVQUFrQjtRQUN4QixVQUFVLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLElBQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzNGLElBQU0sb0JBQW9CLEdBQUcsZUFBZSxJQUMxQyxrQkFBK0MsQ0FBQyxDQUFDLENBQUMsWUFBWSxNQUFNLENBQUM7UUFDdkUsSUFBTSxvQkFBb0IsR0FBYSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQ3JELG9CQUFvQixDQUFDLENBQUMsQ0FBRSxrQkFBK0IsQ0FBQyxDQUFDO1lBQ3hELGtCQUFvQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLE9BQU8sQ0FBQyxFQUFFLEVBQVYsQ0FBVSxDQUFDLENBQ3JFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWlDLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsQ0FBOEIsVUFBb0IsRUFBcEIsNkNBQW9CLEVBQXBCLGtDQUFvQixFQUFwQixJQUFvQjtZQUFqRCxJQUFNLG1CQUFtQiw2QkFBQTtZQUM1QixJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEQsT0FBTyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3BCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLENBQUMsbUJBQW1CLENBQUM7Z0JBQzdCLENBQUM7Z0JBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2QsQ0FBQztTQUNGO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELGtDQUFrQztBQUNqQyxNQUFjLENBQUMsV0FBVyxHQUFHO0lBQzVCLHVCQUF1QixFQUF2QixVQUNFLFNBQXFDLEVBQ3JDLFNBQTRCO1FBQTVCLDBCQUFBLEVBQUEsNEJBQTRCO1FBRTVCLElBQU0sZUFBZSxHQUFHLE9BQU8sU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDO1lBQ3JELFNBQVMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLENBQW9CLFVBQVMsRUFBVCx1QkFBUyxFQUFULHVCQUFTLEVBQVQsSUFBUztZQUE1QixJQUFNLFNBQVMsa0JBQUE7WUFDbEIsSUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDcEIsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0IsSUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNaLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLENBQUM7Z0JBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2QsQ0FBQztTQUNGO0lBQ0gsQ0FBQztDQUNGLENBQUMifQ==
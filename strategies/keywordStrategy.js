'use strict';

const fileSystem = require('fs');
const path = require('path');
const keywordProductGroupMapping = JSON.parse(
  fileSystem.readFileSync(path.join(__dirname, '../config/keywordProductGroupMapping.json'), 'utf8')
);

module.exports = {
  triage: function (messageTxt) {
    let lowerCaseMessageTxt = messageTxt.toLowerCase();

    for (const mapping of keywordProductGroupMapping.mappings) {
      for (const keyword of mapping.keywords.map(keyword => keyword.toLowerCase())) {
        if (lowerCaseMessageTxt.includes(keyword)) {
          // Return the first match
          // TODO: Should consider multiple matches. Some keyword could belong to multiple groups
          return {
            keywordFound: keyword,
            group: mapping.group,
          };
        }
      }
    }

    // Nothing found, go to platform :try_not_to_cry:
    return {
      keywordFound: null,
      group: 'Platform', // not used
    };
  },
};

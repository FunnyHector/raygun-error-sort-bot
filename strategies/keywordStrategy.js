'use strict';

const fileSystem = require('fs');
const path = require('path');
const keywordProductGroupMapping = JSON.parse(
  fileSystem.readFileSync(path.join(__dirname, '../config/keywordProductGroupMapping.json'), 'utf8')
);

module.exports = {
  triage: function (messageTxt) {
    console.log(`Entering triage()`);

    let lowerCaseMessageTxt = messageTxt.toLowerCase();

    for (const mapping of keywordProductGroupMapping.mappings) {
      for (const keyword of mapping.keywords.map(keyword => keyword.toLowerCase())) {
        console.log(`trying keyword: ${keyword} with messageTxt: ${lowerCaseMessageTxt}`);

        if (lowerCaseMessageTxt.includes(keyword)) {
          // Debug
          console.log(`Found keyword ${keyword} in the message, which belongs to ${mapping.group}`);

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
      group: 'Platform',
    };
  },
};

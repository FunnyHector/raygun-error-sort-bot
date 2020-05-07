'use strict';

// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require('@slack/bolt');

// Import configs
const CONFIG = require('./config/config');

// Construct the app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Listen to the event of showing the app home tab
require('./eventListeners/appHomeOpened')(app);

// Find the triage strategy
let triageStrategy = null;
if (CONFIG.triageStrategy == 'keyword') {
  triageStrategy = require('./strategies/keywordStrategy');
} else {
  throw 'invalid triage strategy! Check triageStrategy in config.';
}

// Listen to the event of receiving message
require('./eventListeners/message')(app, CONFIG, triageStrategy);

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

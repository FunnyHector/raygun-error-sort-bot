'use strict';

// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

// import configs
const CONFIG = require("./config/config.js");

// Construct the app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// For showing home tab
require("./eventListeners/appHomeOpened")(app);

// For receiving message
require("./eventListeners/message")(app, CONFIG);

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();

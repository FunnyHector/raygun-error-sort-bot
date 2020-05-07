'use strict';

const HomeTabView = {
  type: "home",
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "*Success! My spell to make you want to hang out with me worked!* :tada:",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "Now, I'm gonna sort out new Raygun errors and chuck them to your product groups. Be nice and deal with it ASAP, will ya? I'd really hate to see these errors coming up again.",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app.",
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click me!",
          },
        },
      ],
    },
  ],
}

module.exports = HomeTabView;

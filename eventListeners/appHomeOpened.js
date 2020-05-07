'use strict';

const HomeTabView = require("../views/homeTab");

module.exports = function(app) {
  app.event("app_home_opened", async ({ event, context }) => {
    try {
      /* view.publish is the method that your app uses to push a view to the Home tab */
      const result = await app.client.views.publish({
        /* retrieves your xoxb token from context. This is needed for authentication. */
        token: context.botToken,

        /* the user that opened your app's app home */
        user_id: event.user,

        /* the view payload that appears in the app home*/
        view: HomeTabView,
      });
    } catch (error) {
      console.error(error);
    }
  });
};

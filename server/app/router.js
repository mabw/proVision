module.exports = (app) => {
  const { router, controller } = app;
  router.resources("event", "/api/v1/event", controller.event);
};

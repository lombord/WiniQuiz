export default {
  install(app, options) {
    options.forEach((option) => {
      app.config.globalProperties[`$${option.name}`] = option.value;
    });
  },
};

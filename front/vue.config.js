const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    config.resolve.alias.set("vue-i18n", "vue-i18n/dist/vue-i18n.cjs.js");

    /* disable insertion of assets as data urls b/c Phaser doesn't support it */
    const rules = ["images", "media"];

    rules.forEach((rule) => {
      const ruleConf = config.module.rule(rule);
      ruleConf.type("asset/resource");
    });
  },
  devServer: {
    hot: true,
  },
});

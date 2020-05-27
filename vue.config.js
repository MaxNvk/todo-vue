module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/todo-vue" : "/",
  chainWebpack: config => {
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: [
            "./src/assets/styles/base/_colors.scss",
            "./src/assets/styles/base/_screen-width.scss"
          ]
        })
        .end();
    });
  }
};

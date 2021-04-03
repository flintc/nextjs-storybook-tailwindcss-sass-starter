const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        rule: {
          test: /\.(scss|css)$/,
          include: path.resolve(__dirname, "../"),
        },
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  webpackFinal: (config) => {
    config.resolve.modules[
      (path.resolve(__dirname, "..", "src"), "node_modules")
    ];
    config.module.rules[7].use.push({
      loader: "sass-loader",
      options: {},
    });
    // console.log("...", JSON.stringify(config.module.rules[7]));
    return config;
  },
};

// sets up Less compilation and babel-plugin-import
// for create-react-app:
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  output: {
    crossOriginLoading: "anonymous"
  },
  plugins: [{ plugin: CracoAntDesignPlugin }],
  jest: {
    configure(config) {
      config.transformIgnorePatterns = [
        "/node_modules/(?!antd|rc-pagination|rc-calendar|rc-tooltip)/.+\\.js$",
      ];
      return config;
    },
  },
};


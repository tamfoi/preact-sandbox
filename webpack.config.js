const webpack = require("webpack");
const path = require("path");

module.exports = (env, args) => {
  return {
    mode: "production",
    entry: __dirname + "/index.tsx",
    output: {
      path: __dirname + "/dist",
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.scss/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { modules: true }, // クラスが衝突しないようにする
            },

            {
              loader: "sass-loader",
              options: {
                prependData: "@import './const.scss';", // scss全ファイルに共通のファイルを埋め込む
              },
            },
          ],
        },
        {
          test: /\.(jsx?|tsx?)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: { ie: "11" } }], // 構文の変換
                ["@babel/preset-typescript", { jsxPragma: "h" }],
                ["@babel/preset-react", { pragma: "h" }],
              ],
              plugins: [
                ["@babel/plugin-transform-runtime", { corejs: 3 }], // グローバル汚染が起こらない様にポリフィル
              ],
              sourceType: "unambiguous", // ESModuleを使っている環境のときはデフォルト値(module)で良いので消す
            },
          },
        },
      ],
    },
  };
};

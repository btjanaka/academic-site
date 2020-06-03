const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./webpack/index.js",
  output: {
    // Place the file where Jekyll can grab it.
    path: path.resolve(__dirname, "src"),
    filename: "assets/bundle/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(s[ac]|c)ss$/, // Matches .sass, .scss, .css
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader", // Translates CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/bundle/img/[name]-[contenthash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(off|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/bundle/font/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "/assets/bundle/bundle.css",
      chunkFilename: "[id].css",
      ignoreOrder: false,
    }),
  ],
  mode: "development",
};

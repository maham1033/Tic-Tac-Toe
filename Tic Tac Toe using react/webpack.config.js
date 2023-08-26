const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");


module.exports = {
  mode: process.env.NODE_ENV ?? "development",
  entry: "./src/entrypoint.jsx",
  module: {
    rules: [
     
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env", 
                ["@babel/preset-react", { runtime: "automatic" }], 
              ],
            },
          },
        ],
      },

      /**
       * CSS Loader
       *
       * This will load our per-component CSS files
       */
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
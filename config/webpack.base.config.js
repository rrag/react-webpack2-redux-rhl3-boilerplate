const webpack = require("webpack");
const path = require("path");

const { getIfUtils, removeEmpty } = require("webpack-config-utils")

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

function buildConfig(mode) {
	const { ifProd, ifNotProd, ifNotDev, ifWatch, ifNotWatch } = getIfUtils(mode, ["prod", "dev", "test", "watch"])
	const publicPath = "/"
	return {
		context: path.join(__dirname, ".."),
		entry: removeEmpty([
			ifWatch("react-hot-loader/patch"),
			ifWatch("webpack-hot-middleware/client"),
			// WATCH === mode ? "webpack-dev-server/client?http://localhost:3000" : null,
			// WATCH === mode ? "webpack/hot/only-dev-server" : null,
			"./src/index",
		]),
		output: {
			path: path.join(__dirname, "..", "build"),
			publicPath,
			filename: `dist/main${ifProd(".min", "")}${ifWatch("", ".[hash]")}.js`,
			pathinfo: ifWatch(true, false), // since we have eval as devtool for watch, pathinfo gives line numbers which are close enough
		},
		devtool: ifWatch("eval-source-map", "sourcemap"),
		module: {
			loaders: [
				// { test: /\.json$/, loader: "json" },
				// { test: /\.html$/, loader: "html" },
				{ test: /\.(js|jsx)$/, loaders: ["babel-loader"], exclude: /node_modules/ },
				// { test: /\.(js|jsx)$/, loaders: ["babel"], exclude: /node_modules\/(?!react-stockcharts$)/, },
				// { test: /\.jpg$/, loader: "file-loader" },
				// { test: /\.(png|svg)$/, loader: "url-loader?mimetype=image/png" },
				// { test: /\.scss$/, loaders: ["style", "css", "autoprefixer", "sass?outputStyle=expanded"] },
			]
		},
		plugins: removeEmpty([
			new ProgressBarPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.OccurrenceOrderPlugin(),
			ifWatch(new webpack.HotModuleReplacementPlugin()),
			ifProd(new webpack.optimize.DedupePlugin()),
			ifNotWatch(new webpack.DefinePlugin({
				"process.env": {
					// This has effect on the react lib size
					NODE_ENV: JSON.stringify("production"),
				},
			})),
			ifProd(new webpack.optimize.UglifyJsPlugin({
				compress: {
					screw_ie8: true,
					warnings: false,
					drop_console: true,
				},
				sourceMap: true,
			})),
			new HtmlWebpackPlugin({
				template: "./src/indexTemplate.js",
				title: "foobar",
				mode,
				filename: `index${ifNotDev("", ".dev")}.html`
			}),
			/*
			ifProd(new OfflinePlugin()),*/
		]),
		devServer: {
			// display no info to console (only warnings and errors), default: false
			noInfo: true,

			// display nothing to the console, default: false
			// quiet: false,

			// switch into lazy mode
			// that means no watching, but recompilation on every request, default: false
			// lazy: false,

			// watch options (applicable when lazy: false)
			watchOptions: {
				aggregateTimeout: 300,
				poll: true
			},
			// enable hot reloading, default: true
			// hot: true,

			// public path to bind the middleware to
			// use the same as in webpack
			publicPath,

			// custom headers
			headers: {
				"X-Custom-Header": "yes"
			},
			// options for formating the statistics
			stats: {
				colors: true
			}
		},
		externals: ifNotProd({
			"react": "React",
			"react-dom": "ReactDOM"
		}, {}),
		resolve: {
			extensions: [".js", ".jsx", ".scss"]
		}
	};
}

module.exports = buildConfig;

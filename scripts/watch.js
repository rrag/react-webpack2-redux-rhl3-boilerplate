
const path = require("path")
const webpack = require("webpack")
const express = require("express")

const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")

const buildConfig = require("../config/webpack.base.config");

const config = buildConfig("watch")
const compiler = webpack(config)

const app = express()
const port = 3000;

app.use(express.static(path.join(__dirname, "../node_modules")));

app.use(webpackDevMiddleware(compiler, config.devServer))
app.use(webpackHotMiddleware(compiler, {}))

app.listen(port, function() {
	console.log(`Open http://localhost:${port}`)
});

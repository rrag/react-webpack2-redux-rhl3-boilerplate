
const path = require("path")
const express = require("express")
const port = 3000;
const app = express()

app.use(express.static(path.join(__dirname, "../node_modules")));
app.use(express.static(path.join(__dirname, "../build")));

app.listen(port, function() {
	console.log(`Open http://localhost:${port}`)
});

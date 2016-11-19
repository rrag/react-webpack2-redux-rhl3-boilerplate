import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import configureStore from "./redux/store/configureStore";
import Root from "./containers/Root";

const store = configureStore();

const rootEl = document.getElementById("root");

function render() {
	ReactDOM.render(<AppContainer><Root store={ store } /></AppContainer>,
		rootEl
	)
}

render()

if (module.hot) {
	// $FlowSuppressErrorOnNextLine
	module.hot.accept("./containers/Root", () => {
		// If you use Webpack 2 in ES modules mode, you can
		// use <App /> here rather than require() a <NextApp />.
		// const NextRoot = require("./containers/Root").default;
		// <NextRoot store={ store }  />
		ReactDOM.render(<AppContainer>
				<Root store={ store } />
			</AppContainer>,
			rootEl
		);
	});
}

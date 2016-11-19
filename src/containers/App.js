
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Layout from "../components/Layout";
import Counter from "../components/Counter";

import * as CounterActions from "../redux/actions/CounterActions"

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

class App extends Component {
	render() {
		const { counter, actions } = this.props;
		return (
			<Layout>
				<Counter
					onAdd={actions.increment}
					onSubtract={actions.decrement}
					value={counter.value} />
			</Layout>
		);
	}
}

function mapStateToProps({ counter }) {
	return {
		counter,
	};
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(CounterActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

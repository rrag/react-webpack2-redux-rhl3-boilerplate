import React, {
	Component
} from "react";

export default class Counter extends Component {
	render() {
		const { onAdd, onSubtract, value } = this.props;
		return (
			<div>
				<h2>Counters: {value}</h2>
				<button onClick={onAdd}>+</button>
				<button onClick={onSubtract}>-</button>
			</div>
		);
	}
}

import counterReducers from "../modules/counter";

const initialState = {
	value: 0
}

export default function counter(state = initialState, action) {
	const { type, ...rest } = action;
	console.log("ACTION TRIGGERED - ", type, rest);

	for (let i = 0; i < counterReducers.length; i++) {
		const eachReducer = counterReducers[i]
		const newState = eachReducer(state, action)
		if (newState != null && newState != undefined && newState !== state) {
			return newState;
		}
	}

	switch (type) {
	default:
		return state;
	}
}

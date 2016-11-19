const DECREMENT = "DECREMENT"

export function decrement() {
	return {
		type: DECREMENT,
	};
}

export default function reducer(state, action) {
	const { type } = action
	switch (type) {
	case DECREMENT: {
		return {
			...state,
			value: state.value - 1,
		}
	}
	}
}

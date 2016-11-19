const INCREMENT = "INCREMENT"

export function increment() {
	return {
		type: INCREMENT,
	};
}

export default function reducer(state, action) {
	const { type } = action
	switch (type) {
	case INCREMENT: {
		return {
			...state,
			value: state.value + 1,
		}
	}
	}
}

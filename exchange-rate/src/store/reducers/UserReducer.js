// initial state
const initialState = {
  name: "Abraham Galindo",
};

// reducer
export function userReducer(state = initialState, action) {
  return state;
}

// selectors
export const getName = (state) => state.user.name;

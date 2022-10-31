import { ADD_TOKEN, DESTROY_TOKEN } from "../actionTypes";

const initialState = {
  userId: 0,
  token: "",
};

/**
 * Reducer function of redux, handles the state change with actions
 * When adding a token, set the state to payload
 * When destroying a token, set the state to initial state
 * @param {*} state redux global state
 * @param {*} action redux action
 * @returns 
 */
export default function users(state = initialState, action) {
  switch (action.type) {
    case ADD_TOKEN: {
      const { userId, token, isInfluencer } = action.payload;
      console.log(token);
      return {
        ...state,
        userId: userId,
        token: token,
        isInfluencer: isInfluencer,
      };
    }
    case DESTROY_TOKEN:
      return state = initialState;
    default:
      return state;
  }
}
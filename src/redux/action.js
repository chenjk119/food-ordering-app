import { ADD_TOKEN, DESTROY_TOKEN } from "./actionTypes";

/**
 * Adds a token in the redux store
 * @param userId the id to store in the redux store
 * @param token the token to store in the redux store
 */
export const addToken = (userId, token) => ({
  type: ADD_TOKEN,
  payload: {
    userId: userId,
    token: token,
  }
});

/**
 * Destroys the token stored in the redux store
 */
export const destroyToken = () => ({
  type: DESTROY_TOKEN,
});
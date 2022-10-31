/**
 * Gets users state from the redux store
 * @param store 
 */
export const getUsersState = store => {
    console.log(store);
    return store.users;
};

/**
 * Gets the token from the redux store
 * @param store 
 */
export const getToken = store => getUsersState(store).token;

/**
 * Gets the user id from the redux store
 * @param store 
 */
export const getUserId = store => getUsersState(store).userId;
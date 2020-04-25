export const mutations = {
    updateAuthToken(state, newToken) {
        state.auth.token = newToken;
    }
}

export const getters = {
    token(state) {
        return state.auth.token;
    }
}
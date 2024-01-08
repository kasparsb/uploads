let state = {}

export default {
    set(key, value) {
        state[key] = value;
    },
    get(key) {
        return state[key];
    }
}
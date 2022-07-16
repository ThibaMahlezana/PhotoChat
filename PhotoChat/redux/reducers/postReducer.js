import { POST_FETCH_ALL } from "../actions/types";

const INITIAL_STATE = {
    posts: []
}

const post = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_FETCH_ALL:
            return { ...state, posts: action.payload };
        default:
            return state
    }
}

export default post;
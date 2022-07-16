import { POST_FETCH_ALL } from "../actions/types";

export const fetchPosts = () => {
    return dispatch => {
        let arrayPosts = [{name: 'post title', description: 'this is a caption'}];
        dispatch({ type: POST_FETCH_ALL, payload: arrayPosts });
    }
}
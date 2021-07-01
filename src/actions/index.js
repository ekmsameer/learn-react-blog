import jsonplaceholder from '../api/jsonPlaceholder';
import _ from 'lodash';

export const fetchPosts =() =>{
    return async dispatch =>{
        const posts =  await jsonplaceholder.get('/posts')
        dispatch({ type: 'FETCH_POSTS', payload: posts.data})
    }
}

export const fetchUser =(userId) =>{
    return async dispatch =>{
        const user =  await jsonplaceholder.get(`/users/${userId}`)
        dispatch({ type: 'FETCH_USER', payload: user.data})
    }
}

export const fetchPostsAndUsers = () =>{
    return async (dispatch, getState) => {
        await dispatch(fetchPosts());
        const userIds = _.uniq(_.map(getState().posts, 'userId'))
        console.log(userIds)
        userIds.forEach((id)=>dispatch(fetchUser(id)))
    }
}
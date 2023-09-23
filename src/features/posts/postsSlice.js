import { createSlice, nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = 'http://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
    const response = await axios.get(POSTS_URL);
    console.log(response.data);
    return response.data;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return{
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            like: 0,
                            love: 0,
                            wow: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        addReactions(state, action) {
            const { postId, reaction } = action.payload;
            const postToReact = state.posts.find(post => post.id === postId);
            if(postToReact){
                postToReact.reactions[reaction]++
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                    state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'secceded';

                // adding date and reactions because they are not available in the api data
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++});
                    post.reactions = {
                        reactions: {
                            like: 0,
                            love: 0,
                            wow: 0,
                            coffee: 0
                        }
                    }

                    return post;
                })

                state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    }
});

export const selectAllPost = state => state.posts.posts;

export const { postAdded, addReactions } = postsSlice.actions

export default postsSlice.reducer;
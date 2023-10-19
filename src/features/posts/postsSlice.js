import { createSlice, nanoid,createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import parseISO from "date-fns/parseISO";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => parseISO(b.date) - parseISO(a.date),
    status: 'idle',
    error: null,
})

export const fetchPosts = createAsyncThunk('posts/getPosts/', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
})

export const addPosts = createAsyncThunk('posts/addPosts/', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    // console.log(response.data)
    return response.data;
})

export const updatePost = createAsyncThunk('posts/updatePost/', async (initialPost) => {
    const {id} = initialPost;

    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    console.log(response.data)
    return response.data;
})

export const deletePost = createAsyncThunk('post/deletePost', async (initialPost) => {
    const {id} = initialPost;
    const response = await axios(`${POSTS_URL}/${id}`);
    if(response?.status === 200) return initialPost;
    return `${response.status} : ${response.statusText}`;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: postAdapter.getInitialState(),
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
            const postToReact = state.entities[postId]
            if(postToReact){
                postToReact.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                    state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';

                // adding date and reactions because they are not available in the api data
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString();
                    post.reactions = {
                            like: 0,
                            love: 0,
                            wow: 0,
                            coffee: 0
                        }
                    return post;
                })
                // state.posts = state.posts.concat(loadedPosts);
                // state.posts = [...state.posts, loadedPosts];
                postAdapter.upsertMany(state, loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(addPosts.fulfilled, (state, action) => {
                action.payload.id = state.ids.length + 1
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    like: 0,
                    love: 0,
                    wow: 0,
                    coffee: 0
                }
                console.log(action.payload);
                postAdapter.addOne(state, action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if(!action.payload?.id){
                    console.log('Post not updated')
                    console.log(action.payload)
                    return;
                }

                // const {id} = action.payload;
                action.payload.date = new Date().toISOString();
                // const posts = state.posts.filter(post => post.id !== id);
                // state.posts = [...posts, action.payload];
                postAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if(!action.payload?.id){
                    console.log('Post not Deleted')
                    console.log(action.payload)
                    return;
                }

                const { id } = action.payload;
                // const posts = state.posts.filter(post => post.id !== id);
                postAdapter.removeOne(state, id)
            })
    }
});

export const {
    selectAll: selectAllPost,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => state.posts)

// export const selectAllPost = state => state.posts.posts;
export const getPostStatus = state => state.posts.status;
export const getPostError = state => state.posts.error;
// export const singlePostId = (state, postId) => state.posts.post.find(post => post.id === postId);

export const { postAdded, addReactions } = postsSlice.actions

export default postsSlice.reducer;
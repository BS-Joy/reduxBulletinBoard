import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import parseISO from "date-fns/parseISO";
import { apiSlice } from "../api/apiSlice";

const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => parseISO(b.date) - parseISO(a.date)
})

const initialState = postAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if(!post?.date) post.date = sub(new Date(), {minutes: min++}).toISOString();
                    if(!post?.reactions) post.reactions = {
                        like: 0,
                        love: 0,
                        wow: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: 'LIST'},
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        getPostByUserId: builder.query({
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if(!post?.date) post.date = sub(new Date(), {minutes: min++}).toISOString();
                    if(!post?.reactions) post.reactions = {
                        like: 0,
                        love: 0,
                        wow: 0,
                        coffee: 0
                    }
                    return post;
                });
                return postAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => {
                console.log(result)
                return [
                    ...result.ids.map(id => ({ type: 'Post', id}))
                ]
            }
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: 'posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        like: 0,
                        love: 0,
                        wow: 0,
                        coffee: 0
                    }
                }
            }),
            invalidatesTags: [{ type: 'Post', id: 'LIST'}]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        deletePost: builder.mutation({
            query: ({id}) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        }),
        addReaction: builder.mutation({
            query: ({postId, reactions}) => ({
                url: `/posts/${postId}`,
                method: 'PATCH',
                body: { reactions }
            }),
            async onQueryStarted({postId, reactions}, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        const post = draft.entities[postId];
                        if(post) post.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })
})

export const {
    useGetPostsQuery,
    useGetPostByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation
} = extendedApiSlice;

const selectPostResult = extendedApiSlice.endpoints.getPosts.select();
// console.log(selectPostResult)

const selectPostData = createSelector(
    selectPostResult,
    postsResult => {
        // console.log(postsResult);
        return postsResult.data
    }
)

export const {
    selectAll: selectAllPost,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => selectPostData(state) ?? initialState);
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import { selectAllPost, getPostStatus, getPostError, fetchPosts } from '../../features/posts/postsSlice';
import { parseISO } from 'date-fns';

const PostsList = () => {
    const dispatch = useDispatch()

    const posts = useSelector(selectAllPost);
    const postStatus = useSelector(getPostStatus);
    const postError = useSelector(getPostError);

    useEffect(() => {
        if(postStatus === 'idle') {
           dispatch(fetchPosts()) 
        }
    }, [dispatch, postStatus, posts])

    let content = [];

    if(postStatus === 'loading'){
        content = 
        <div className='flex justify-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    } else if(postStatus === 'succeeded') {
        const sortedPosts = posts.slice().sort((a, b) => parseISO(b.date) - parseISO(a.date));
        content = sortedPosts.map((post) => 
            <Post key={post.id} post={post} />
        );
        // console.log(sortedPosts)
    } else if(postStatus === 'failed') {
        content = {postError}
    }

    return (
        <div>
            <h1 className='text-center text-2xl font-bold my-4'>Posts</h1>
            {content}
        </div>
    )
}

export default PostsList;

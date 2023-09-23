import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import { selectAllPost } from '../../features/posts/postsSlice';
import { parseISO } from 'date-fns';

const PostsList = () => {
    const posts = useSelector(selectAllPost);
    
    const sortedPosts = posts.slice().sort((a, b) => parseISO(b.date) - parseISO(a.date));

    return (
        <div>
            {sortedPosts.map((post, key) => <Post key={key} post={post} />)}
        </div>
    )
}

export default PostsList;

// import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../features/users/usersSlice';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';


const Post = ({post}) => {
    const users = useSelector(selectAllUsers);

    const author = users.find(user => user.id === post.userId);

    return (
        <>
            <div key={post.key} className="card bg-base-200 mb-8 p-7 rounded">
                <sub className='text-sm block mb-2'> {author? ` 🙂  ${author.name}` : '🙂  Anonymous Author'}</sub> 
                <h1 className='text-2xl mb-2'>{post.title}</h1>
                <TimeAgo timePosted={post.date} />
                <p className='bg-[#E9E7E7] rounded p-5 mb-2'>{post.content}</p>
                <ReactionButtons post={post} />

            </div>
        </>
    )
}

export default Post;

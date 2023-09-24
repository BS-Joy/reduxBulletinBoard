import React from 'react';
import { useDispatch } from 'react-redux';
import { addReactions } from '../../features/posts/postsSlice';

const reactionEmojis = {
    like: '👍',
    love: '❤️',
    wow: '😲',
    coffee: '☕'
}

const ReactionButtons = ({post}) => {
    const dispatch = useDispatch();
    return (
        <div className='flex gap-2'>
            {
                Object.entries(reactionEmojis).map(([name, emoji]) => 
                (
                    <button
                        key={name}
                        type='button'
                        onClick={() => dispatch(addReactions({postId: post.id, reaction: name}))}
                    >
                        {emoji} {post.reactions[name]}
                    </button>
                ))
            }
        </div>
    );
}

export default ReactionButtons;

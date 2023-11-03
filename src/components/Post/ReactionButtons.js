import React from 'react';
import { useAddReactionMutation } from '../../features/posts/postsSlice';

const reactionEmojis = {
    like: '👍',
    love: '❤️',
    wow: '😲',
    coffee: '☕'
}

const ReactionButtons = ({post}) => {
    const [addReactions] = useAddReactionMutation();
    return (
        <div className='flex gap-2'>
            {
                Object.entries(reactionEmojis).map(([name, emoji]) => 
                (
                    <button
                        key={name}
                        type='button'
                        onClick={() => { 
                            console.log(name)
                            const newValue = post.reactions[name] + 1;
                            console.log(newValue)
                            addReactions({postId: post.id, reactions: { ...post.reactions, [name]: newValue} })
                        }}
                    >
                        {emoji} {post.reactions[name]}
                    </button>
                ))
            }
        </div>
    );
}

export default ReactionButtons;

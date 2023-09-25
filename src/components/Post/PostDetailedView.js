import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../features/users/usersSlice';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { useParams } from 'react-router-dom';
import { selectAllPost } from '../../features/posts/postsSlice';
import { useEffect } from 'react';

const PostDetailedView = () => {
    const users = useSelector(selectAllUsers);
    const allPosts = useSelector(selectAllPost);
    const { id } = useParams();

    const postId = Number(id);
    const post = allPosts.find(post => post.id === postId);

    useEffect(() => {
        document.title = post.title
    }, [post.title])

    

    const author = users.find(user => user.id === post.userId);

    return (
        <>
            <div className="card bg-base-200 mb-8 p-7 rounded">
                <sub className='text-sm block mb-2'>🙂 {author? `${author.name}` : 'Anonymous Author'}</sub> 
                <h1 className='text-2xl mb-2'>{post?.title}</h1>
                <TimeAgo timePosted={post?.date} />
                <p className='bg-[#E9E7E7] rounded p-5 mb-2'>{post?.body}</p>
                <ReactionButtons post={post} />
            </div>
        </>
    );
}

export default PostDetailedView;

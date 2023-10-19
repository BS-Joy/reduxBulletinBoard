import { useSelector } from 'react-redux';
import { selectAllUsers } from '../../features/users/usersSlice';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';
import { selectPostById } from '../../features/posts/postsSlice';


const Post = ({postId}) => {
    const users = useSelector(selectAllUsers);
    const post = useSelector(state => selectPostById(state, postId));

    const author = users.find(user => user.id === post.userId);

    return (
        <>
            <div className="card bg-base-200 mb-8 p-7 rounded">
                <sub className='text-sm block mb-2'>🙂 {author? `${author.name}` : 'Anonymous Author'}</sub> 
                <h1 className='text-2xl mb-2'>{post.title}</h1>
                <TimeAgo timePosted={post.date} />
                <p className='bg-[#E9E7E7] rounded p-5 mb-2'>
                    {post.body.substring(0, 50)} ...
                    <Link className='text-blue-500' to={`/post/${post.id}`}> see full post</Link>
                </p>
                <ReactionButtons post={post} />
            </div>
        </>
    )
}

export default Post;

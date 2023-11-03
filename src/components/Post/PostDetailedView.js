import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../../features/users/usersSlice';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllPost } from '../../features/posts/postsSlice';
import { useEffect } from 'react';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useDeletePostMutation } from '../../features/posts/postsSlice';

const PostDetailedView = () => {
    const users = useSelector(selectAllUsers);
    const allPosts = useSelector(selectAllPost);
    const { id } = useParams();
    const navigate = useNavigate();

    const [ deletePost ] = useDeletePostMutation();


    const postId = Number(id);
    const post = allPosts.find(post => post.id === postId);

    useEffect(() => {
        document.title = post.title
    }, [post.title])

    const handleDelete = async () => {
        let agree = window.confirm('Are you sure you want to delete the post');
        if(agree) {
            try{
                await deletePost({id: post.id}).unwrap();

                navigate('/')
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log(agree)
        }
    }

    const author = users.find(user => user.id === post.userId);

    return (
        <>
            <div className="card bg-base-200 mb-8 p-7 rounded my-4">
                <sub className='text-sm block mb-2'>🙂 {author? `${author.name}` : 'Anonymous Author'}</sub> 
                <h1 className='text-2xl mb-2'>{post?.title}</h1>
                <TimeAgo timePosted={post?.date} />
                <p className='bg-[#E9E7E7] rounded p-5 mb-2'>{post?.body}</p>
                <div className='flex justify-between mt-3'>
                  <ReactionButtons post={post} /> 
                  <div className='flex gap-3'>
                    <Link to={`/editPost/${postId}`}><button type='button' className='btn btn-outline-info bg-base-100'><BiEdit /> Edit Post</button></Link>
                    <button type='button' onClick={handleDelete} className='btn btn-outline-info bg-red-300 hover:bg-red-400'><RiDeleteBin6Line /> Delete Post</button>
                  </div>
                </div>
                
            </div>
        </>
    );
}

export default PostDetailedView;

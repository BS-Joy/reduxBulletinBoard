import { useSelector } from 'react-redux';
import Post from './Post';
import { selectPostIds, getPostStatus, getPostError,  } from '../../features/posts/postsSlice';
// import { parseISO } from 'date-fns';

const PostsList = () => {
    const sortedPostIds = useSelector(selectPostIds);
    const postStatus = useSelector(getPostStatus);
    const postError = useSelector(getPostError);

    let content; 
    if(postStatus === 'loading'){
        content = 
        <div className='flex justify-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    } else if(postStatus === 'succeeded') {
        // const sortedPosts = posts.slice().sort((a, b) => parseISO(b.date) - parseISO(a.date));
        content = sortedPostIds.map(postId => 
            <Post key={postId} postId={postId} />
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

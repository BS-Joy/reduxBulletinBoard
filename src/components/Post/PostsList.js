import { useSelector } from 'react-redux';
import Post from './Post';
import { selectPostIds } from '../../features/posts/postsSlice';
import { useGetPostsQuery } from '../../features/posts/postsSlice';

const PostsList = () => {

    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery()

    const sortedPostIds = useSelector(selectPostIds);

    let content; 
    if(isLoading){
        content = 
        <div className='flex justify-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    } else if(isSuccess) {
        // const sortedPosts = posts.slice().sort((a, b) => parseISO(b.date) - parseISO(a.date));
        content = sortedPostIds.map(postId => 
            <Post key={postId} postId={postId} />
        );
        // console.log(sortedPosts)
    } else if(isError) {
        content = {error}
    }

    return (
        <div>
            <h1 className='text-center text-2xl font-bold my-4'>Posts</h1>
            {content}
        </div>
    )
}

export default PostsList;

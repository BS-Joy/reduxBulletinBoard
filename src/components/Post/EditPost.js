import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllPost } from "../../features/posts/postsSlice";
import { selectAllUsers } from "../../features/users/usersSlice";
import { useUpdatePostMutation } from "../../features/posts/postsSlice";

const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [ updatePost, { isLoading }] = useUpdatePostMutation();

    const posts = useSelector(selectAllPost);
    const users = useSelector(selectAllUsers);

    const post = posts.find(post => post.id === Number(postId));

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);

    if(!post) {
        return <h1>No Post Found</h1>
    }

    const titleHandle = (event) => setTitle(event.target.value)
    const contentHandle = (event) => setContent(event.target.value)
    const onAuthorChanged = (event) => setUserId(Number(event.target.value));

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const onSubmit = async () => {
        console.log('updaing....')
        if(canSave) {
            try {

                await updatePost({id: post.id, title, body: content, userId, reactions: post.reactions}).unwrap();

                console.log('still updating')

                setTitle('')
                setContent('')
                setUserId('')

                navigate(`/post/${postId}`);
            } catch (Error) {
                console.error(Error);
            }
        }
    }

    return (
        <>
        <div className="px-36 py-10 my-4 bg-base-200 rounded">
            <div className="text-center">
            <h1 className="text-2xl mb-4 py-4 font-bold">Edit Post</h1>
            </div>
            <div className="card w-full shadow-2xl bg-base-100">
            <form className="card-body">
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Title:</span>
                </label>
                <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered"
                    value={title}
                    onChange={titleHandle}
                />
                </div>

                <div>
                <label className="label" htmlFor="author">
                    Author:
                </label>
                <select 
                onChange={onAuthorChanged}
                value={userId} id="postAuthor">
                    <option value="">Select Author</option>
                    {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                    ))}
                </select>
                </div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text">Content:</span>
                </label>
                <textarea
                    className="textarea textarea-bordered"
                    placeholder="Post Content"
                    rows="10"
                    value={content}
                    onChange={contentHandle}
                ></textarea>
                </div>
                <div className="form-control mt-6">
                <button
                    onClick={onSubmit}
                    type="button"
                    className="btn btn-success hover:bg-green-500"
                    disabled={!canSave}
                >
                    Submit
                </button>
                </div>
            </form>
            </div>
        </div>
        </>
    );
};

export default EditPost;

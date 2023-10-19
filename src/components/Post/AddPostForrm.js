import React, { useState } from "react";
import { addPosts } from "../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForrm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState('');
  const [postAddStatus, setPostAddStatus] = useState('idle');

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const titleHandle = (event) => setTitle(event.target.value);
  const contentHandle = (event) => setContent(event.target.value);
  const onAuthorChanged = (event) => setUserId(event.target.value);

  const canSave = [title, content, userId].every(Boolean) && postAddStatus === 'idle';

  const onSubmit = () => {
    if(canSave) {
      try {
        setPostAddStatus('pending')
        dispatch(addPosts({title, body: content, userId})).unwrap()

        setTitle('');
        setContent('');
        setUserId('');
        navigate('/')
      } catch (err) {
        console.error('Failed to add new post ', err)
      } finally {
        setPostAddStatus('idle')
      }
    }
  }

  return (
    <>
        <div className="px-36 py-10 mb-4 bg-base-200 rounded">
          <div className="text-center">
            <h1 className="text-2xl mb-4 py-4 font-bold">Add New Post</h1>
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
                <label className="label" htmlFor="author">Author:</label>
                <select onChange={onAuthorChanged} value={userId} id="postAuthor">
                  <option value="">Select Author</option>
                  {users.map(user => (
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
                 rows='10'
                 value={content}
                 onChange={contentHandle}
                 ></textarea>
              </div>
              <div className="form-control mt-6">
                <button 
                  onClick={onSubmit} 
                  type="button" 
                  className="btn btn-success hover:bg-green-500"
                  disabled={!canSave}>
                    Submit
                  </button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
};

export default AddPostForrm;

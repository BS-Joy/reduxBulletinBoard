import PostsList from "./components/Post/PostsList";
import AddPostForrm from "./components/Post/AddPostForrm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PostDetailedView from "./components/Post/PostDetailedView";
import EditPost from "./components/Post/EditPost";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <PostsList />
        },
        {
          path: '/post/:id',
          element: <PostDetailedView />
        },
        {
          path: '/add_post',
          element: <AddPostForrm />
        },
        {
          path: '/editPost/:postId',
          element: <EditPost />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

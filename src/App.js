import PostsList from "./components/Post/PostsList";
import AddPostForrm from "./components/Post/AddPostForrm";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PostDetailedView from "./components/Post/PostDetailedView";

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

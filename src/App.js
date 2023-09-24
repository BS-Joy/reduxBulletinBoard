import PostsList from "./components/Post/PostsList";
// import AddPostForrm from "./components/Post/AddPostForrm";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <div className="bg-white z-10 sticky top-0 text-center border border-green-600 my-4">
          <h1 className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-5xl py-4 ">Bulletin Board</h1>
        </div>
        {/* <AddPostForrm /> */}
        <PostsList />
      </div>
    </>
  );
}

export default App;

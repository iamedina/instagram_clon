import Post from "./Post";

function ArticleView({ posts = [], setSelectedUserId, setView }) {


    if (!posts.length) {
        return <h2 className="text-center text-sm md:text-2xl mt-20 text-gray-500 dark:text-[#ffffff]">Aún no hay publicaciones. Haz clic en "Crear".</h2>;
    }

    return (
        <div className="space-y-6">
            {posts.map((post, index) => (
                <Post key={`${post.id}-${index}`} post={post} setSelectedUserId={setSelectedUserId} setView={setView}/>
            ))} 
        </div>
    );

}

export default ArticleView
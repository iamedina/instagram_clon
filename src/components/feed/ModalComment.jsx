import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import { useState, useEffect } from "react";

function ModalComment({ open, close, userId, postId, username }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Cargar comentarios del localStorage
    useEffect(() => {
        if (!postId || !userId) return;
        const stored = JSON.parse(localStorage.getItem(`comments_${postId}_${userId}`)) || [];
        setComments(stored);
    }, [postId, userId]);

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const updated = [
            ...comments,
            { id: Date.now(), text: newComment, username: username, likes: 0 }
        ];
        setComments(updated);
        localStorage.setItem(`comments_${postId}_${userId}`, JSON.stringify(updated));
        setNewComment("");
    };

     const handleLikeComment = (id) => {
        const updated = comments.map(c =>
            c.id === id ? { ...c, likes: c.likes + 1 } : c
        );
        setComments(updated);
        localStorage.setItem(`comments_${postId}`, JSON.stringify(updated));
    };

    if (!open) return null;

    return (
        <div className="flex justify-center items-center h-screen overflow-hidden">
            {open && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/65 z-1000">
                    <button
                        onClick={close}
                        className="absolute top-3 right-3 text-[#ffffff] text-xl cursor-pointer"
                    >
                        <MdClose size={28} />
                    </button>

                    <div className="bg-white rounded-3xl flex flex-col items-center justify-center relative shadow-xl max-h-[898px] max-w-[855px] min-h-[391px] min-w-[348px] max-md:w-[281px] max-md:h-[171px] w-[511px] h-[550px]">
                        <div className="w-full text-center px-4 py-2">
                            <h2 className="text-lg font-medium mb-2">Comentarios</h2>
                            <div className="overflow-y-auto h-[70%] px-2">
                                {comments.length === 0 ? (
                                    <p className="text-gray-500">Aún no hay comentarios</p>
                                ) : (
                                    comments.map((c) => (
                                        <div key={c.id} className="flex items-start gap-3 my-2">
                                            <img
                                                src={`/img/profile.png?name=${c.username}`}
                                                alt="avatar"
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex flex-col justify-start items-start">
                                                <strong className="my-3">{c.username}</strong>
                                                <p className="mt-2">{c.text}</p>
                                                <button
                                                    className="text-sm text-gray-500 mt-1"
                                                    onClick={() => handleLikeComment(c.id)}
                                                >
                                                    ❤️ {c.likes}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="w-full px-4 py-2 flex gap-2">
                            <input
                                className="flex-1 rounded outline-none border border-gray-200 px-2 py-1"
                                placeholder="Añade un comentario..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                onClick={handleAddComment}
                            >
                                Publicar
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ModalComment;

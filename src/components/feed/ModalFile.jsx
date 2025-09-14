import { useState, useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";

function ModalFile({ open, close, uploadSuccess }) {

    const file = useRef(null);
    const [items, setItems] = useState([]);
    const [index, setIndex] = useState(0);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileClick = () => file.current?.click();

    useEffect(() => {
        if (!open) {

            items.forEach((it) => URL.revokeObjectURL(it.preview));
            setItems([]);
            setIndex(0);
            setError("");
            setUploading(false);
        }

    }, [open]);

    //Selecciona el archivo para despues usarlo 
    const handleFileChange = (e) => {
        setError("");
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        for (const f of files) {
            const type = f.type || "";
            if (!type.startsWith("image/") && !type.startsWith("video/")) {
                setError(<>
                    No se a podido subir <span className="text-[#303030]">{f.name}</span>
                </>);
                e.target.value = null;
                return;
            }
        }

        const types = files.map((f) => (f.type || "").split("/")[0]);
        const hasVideo = types.includes("video");
        const hasImage = types.includes("image");

        if (hasVideo && hasImage) {
            setError("No mezcles imágenes y vídeos en la misma publicación. Selecciona solo imágenes o un vídeo.");
            e.target.value = null;
            return;
        }


        if (hasVideo && files.length > 1) {
            setError("Solo puedes subir un vídeo por publicación.");
            e.target.value = null;
            return;
        }

        const prepared = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            type: (file.type || "").split("/")[0],
        }));

        setItems(prepared);
        setIndex(0);
    };

    const goPrev = () => setIndex((i) => Math.max(0, i - 1));
    const goNext = () => setIndex((i) => Math.min(items.length - 1, i + 1));

    async function handleUpload() {
        if (!items.length) return setError("Selecciona archivos antes de subir.");
        setUploading(true);
        setError("");


        const fd = new FormData();
        items.forEach((it) => {

            fd.append("files[]", it.file, it.file.name);
        });


        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No estás logueado.");
                setUploading(false);
                return;
            }

            const res = await fetch("/api/upload", {
                method: "POST",
                credentials: "include", 
                headers: { 'Authorization': `Bearer ${token}` },
                body: fd
            });


            const data = await res.json();
            console.log("Respuesta del servidor:", data);


            if (!data || !data.success) {
                throw new Error(data?.error || "Error en el servidor al subir el archivo.");
            }

            const post = data.post;
            if (!post) throw new Error("Respuesta inesperada del servidor. Se esperaba 'post'.");

            uploadSuccess(post);

            close();

            items.forEach((it) => URL.revokeObjectURL(it.preview));
            setItems([]);
            setIndex(0);
        } catch (err) {
            console.error(err);
            setError(err.message || "Error al subir los archivos.");
        } finally {
            setUploading(false);
        }
    }

    if (!open) return null;

    const isVideo = items.length > 0 && items[0].type === "video";
    const isMultipleImages = items.length > 1 && items.every((it) => it.type === "image");

    return (
        <div className="flex justify-center items-center h-screen">
            {open && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/65 z-50">
                    <button onClick={close} className="absolute top-3 right-3 text-[#ffffff] text-xl cursor-pointer">
                        <MdClose size={28} />
                    </button>
                    <div className="bg-white rounded-3xl flex flex-col items-center justify-center relative shadow-xl max-h-[898px] max-w-[855px] min-h-[391px] min-w-[348px] max-md:w-[281px] max-md:h-[171px] w-[511px] h-[550px]">
                        <div className="w-full text-center">
                            <div className="flex justify-around my-3">
                                {items.length > 0 && (
                                    <button
                                        onClick={() => {
                                            if (window.confirm("¿Descartar publicación?")) {
                                                close();
                                            }
                                        }} className=" flex pl-3 cursor-pointer text-black">
                                        <MdChevronLeft size={28} />
                                    </button>
                                )}

                                {/* Texto dinámico */}
                                <p className="text-sm font-medium text-center flex-1  my-1">
                                    {items.length === 1 && items[0].type === "image"
                                        ? "Recortar"
                                        : items.length > 1
                                            ? "Editar imágenes"
                                            : items.length === 1 && items[0].type === "video"
                                                ? "Editar vídeo"
                                                : "Crear nueva publicación"}
                                </p>

                                {items.length > 0 && (
                                    <button
                                        onClick={handleUpload}
                                        disabled={uploading || !items.length}
                                        className={`pr-2 cursor-pointer rounded text-sm font-medium hover:underline ${uploading || !items.length ? "text-blue-600 " : "text-blue-600"}`}>
                                        {uploading ? "Subiendo..." : "Siguiente"}
                                    </button>
                                )}
                            </div>
                            <hr className="text-[#7373734f]" />

                            {items.length === 1 && items[0].type === "image" && (
                                <div className="w-full h-[490px] max-md:w-full max-md:h-80 flex justify-center items-center">
                                    <img src={items[0].preview} alt="preview" className="w-full h-full object-contain" />
                                </div>
                            )}
                        </div>
                        {!items.length && (
                            <div className="flex flex-col items-center justify-center flex-1">
                                <svg aria-label="Icono para representar contenido multimedia, como imágenes o vídeos" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icono para representar contenido multimedia, como imágenes o vídeos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                                <h2 className={`mt-4 px-4 font-normal text-lg text-center ${error ? "text-sm text-[#737373]" : "text-[#000000]"}`}>
                                    {error ? error : "Arrastra las fotos y los vídeos aquí"}
                                </h2>
                                <button type="button" onClick={handleFileClick} className="mt-6 bg-blue-600 font-medium text-white placeholder:text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">
                                    Seleccionar del ordenador
                                </button>
                            </div>
                        )}

                        {/* Para video */}
                        {isVideo && items[0] && (
                            <div className="w-full h-screen  max-md:w-full max-md:h-80 flex justify-center">
                                <video
                                    src={items[0].preview}
                                    controls
                                    className="max-w-full max-h-full"
                                />
                            </div>
                        )}

                        {/* Para varias imagenes */}
                        {isMultipleImages && (
                            <div className="w-full h-full relative flex items-center justify-center">
                                <button
                                    onClick={goPrev}
                                    className="absolute left-2 cursor-pointer bg-black/30 text-white p-2 rounded-full"
                                    aria-label="Anterior imagen"
                                >
                                    <MdChevronLeft  className="cursor-pointer"/>
                                </button>


                                <img
                                    src={items[index].preview}
                                    alt={`preview ${index + 1}`}
                                    className="max-w-full max-h-96  max-md:w-full max-md:h-80 object-cover"
                                />


                                <button
                                    onClick={goNext}
                                    className="absolute right-2 cursor-pointer bg-black/30 text-white p-2 rounded-full"
                                    aria-label="Siguiente imagen"
                                >
                                    <MdChevronRight className="cursor-pointer"/>
                                </button>

                                <div className="absolute bottom-4 flex gap-2">
                                    {items.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setIndex(i)}
                                            aria-label={`Ir a imagen ${i + 1}`}
                                            className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/60"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input oculto y se utiliza un boton por este */}
                    <form id="uploadForm" encType="multipart/form-data" method="POST" role="presentation">
                        <input ref={file} onChange={handleFileChange} accept="image/avif,image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime" className="hidden" type="file" multiple />
                    </form>
                </div>
            )}
        </div>


    );
}

export default ModalFile
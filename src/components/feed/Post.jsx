import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import { useState, useEffect } from "react";

function Post({ post }) {
    const [idx, setIdx] = useState(0);
    const [user, setUser] = useState(null);
    const { type, files, username } = post;

    const prev = () => setIdx(p => (p === 0 ? files.length - 1 : p - 1));
    const next = () => setIdx(p => (p === files.length - 1 ? 0 : p + 1));

    const url = post.files?.[0]?.url || '';
    if (!files || files.length === 0) return null;

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch("https://instagramclon.free.nf/getUser.php", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) setUser({
                username: data.user.username,
            });
        };

        fetchUserData();
    }, []);

    return (
        <article>
            <div className="pb-[8px] w-[100%] min-w-[390px] h-[100%] flex flex-col">
                <div className="min-h-[56px] px-[2px] flex items-center">
                    <div className="w-[100%] flex items-center flex-row justify-start ">
                        <div className="mr-[12px]">
                            <div role="button" className="cursor-pointer bg-transparent touch-manipulation self-center items-center relative block text-decoration-none outline-none">
                                <span className="w-[32px] h-[32px] rounded-[50%] overflow-hidden block cursor-pointer relative list-style-none border border-[#F5F5F5]">
                                    <img src="../src/assets/img/imageLogin.png" alt="" className="w-[100%] h-[100%] object-cover text-[100%] border-0 cursor-pointer" />
                                </span>
                            </div>
                        </div>
                        <div className="overflow-visible min-w-0 bg-transparent flex items-center static flex-row self-auto justify-start grow ">
                            <div className="overflow-visible w-[100%] py-[6px] justify-center bg-transparent flex-col flex items-stretch self-auto relative ">
                                <div className="overflow-visible text-ellipsis whitespace-nowrap font-semibold text-sm text-[#262626] dark:text-[#ffffff] flex bg-transparent items-center static flex-row self-auto justify-start grow-0 ">
                                    <div>
                                        <div className="overflow-visible bg-transparent flex items-center static flex-row slef-auto justify-start">
                                            <span className="overflow-visible bg-transparent block relative whitespace-pre-line leading-[18px]">
                                                <a className="text-decoration-none inline bg-transparent touch-manipulation cursor-pointer outline-none text-[#4150F7]">
                                                    <span className="text-[#000000] dark:text-[#ffffff] font-semibold text-xs leading-[18px] cursor-pointer">
                                                        {username ? (<>{username}</>) : (<p>Cargando...</p>)}
                                                    </span>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-visible bg-transparent flex items-center static flex-row self-auto justify-start ">
                            <div className="overflow-visible bg-transparent flex items-stretch static flex-row self-auto justify-start ml-[8px]">
                                <div role="button" className="cursor-pointer justify-center bg-transparent touch-manipulation self-center items-center relative flex text-decoration-none outline-none">
                                    <svg aria-label="Más opciones" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Más opciones</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden bg-[#000000] rounded-sm flex flex-col justify-center items-center relative ">
                    <div>
                        <div role="button" className="touch-manipulation flex-col flex items-stretch relative align-baseline">
                            <div style={{ width: 'min(470px, 100vw)' }}>
                                <div className="text-[100%]">
                                    <div className="top-0 flex-col flex items-stretch relative align-baseline">
                                        <div className=" block">
                                            <div className="pb-[100%] items-stretch relative block "></div>
                                            <div className="overflow-visible bg-transparent flex-col flex items-stretch self-auto justify-start ">
                                                <div className="w-[100%] h-[100%] text-[100%] flex flex-col items-stretch align-baseline font-inherit ">
                                                    <div className="h-[100%] block overflow-hidden items-stretch absolute inset-0 ">
                                                        {type === "video" ? (
                                                            <video controls className="w-full aspect-square max-h-[520px]">
                                                                <source src={files[0].url} />
                                                                Tu navegador no soporta videos HTML5.
                                                            </video>
                                                        ) : files.length > 1 ? (
                                                            <div className="relative">
                                                                <div className="relative w-full max-h-[520px] overflow-hidden">
                                                                    <img src={files[idx].url} className="w-full aspect-square h-full object-cover" />
                                                                </div>

                                                                {files.length > 1 && type !== "video" && (
                                                                    <>
                                                                        <button
                                                                            onClick={prev}
                                                                            className="absolute left-3 top-1/2 cursor-pointer -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
                                                                            aria-label="Anterior"
                                                                        >
                                                                            <MdChevronLeft />
                                                                        </button>
                                                                        <button
                                                                            onClick={next}
                                                                            className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 bg-black/30 text-white p-2 rounded-full"
                                                                            aria-label="Siguiente"
                                                                        >
                                                                            <MdChevronRight />
                                                                        </button>
                                                                    </>
                                                                )}

                                                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                                                    {files.map((_, i) => (
                                                                        <button
                                                                            key={`${post.id}-file-${i}`}
                                                                            onClick={() => setIdx(i)}
                                                                            className={`w-2 h-2 rounded-full ${i === idx ? "bg-white" : "bg-white/60"}`}
                                                                            aria-label={`Ir a imagen ${i + 1}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <img src={files[idx].url} alt="´post imagen" className="object-cover aspect-square w-[100%] h-[100%] top-0 user-select-none absolute  inset-0 border-0" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-row flex botton-[15px] left-[6px] justify-center items-center right-[6px] absolute ">
                                                <div className="opacity-1 bg-[#ffffff] mr-[4px] rounded-[50%] h-[6px] w-[6px] transition-all duration-300 cursor-pointer"></div>
                                                <div className="opacity-1 bg-[#ffffff] rounded-[50%] h-[6px] w-[6px] transition-all duration-300 cursor-pointer"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[100%] w-[min(470px, 100vw)]"></div>
                    </div>
                </div>
                <div className="relative block">
                    <div className="h-[100%] bg-[#ffffff]  flex-col flex relative">
                        <div>
                            <section className="my-[4px] items-center flex">
                                <div className="flex">
                                    <div className="cursor-pointer block ">
                                        <div role="button" className="py-[8px] pr-[8px] justify-center bg-transparent touch--manipulation flex items-center cursor-pointer outline-none text-decoration-none">
                                            <div className="flex justify-center items-center flex-col hover:text-[#737373] transform-stroke duration-75">
                                                <svg aria-label="Me gusta" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Me gusta</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cursor-pointer block ">
                                        <div role="button" className="p-[8px] justify-center bg-transparent touch--manipulation flex items-center cursor-pointer outline-none text-decoration-none">
                                            <div className="flex justify-center items-center flex-col hover:text-[#737373] transform-stroke duration-75">
                                                <svg aria-label="Comentar" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comentar</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cursor-pointer block ">
                                        <div role="button" className="p-[8px] justify-center bg-transparent touch--manipulation flex items-center cursor-pointer outline-none text-decoration-none">
                                            <div className="flex justify-center items-center flex-col hover:text-[#737373] transform-stroke duration-75">
                                                <svg aria-label="Compartir" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Compartir</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <div role="button" className="cursor-pointer bg-transparent  flex items-center justify-center text-decoration-none outline-none">
                                        <div className="flex flex-col justify-center items-center hover:text-[#737373] transform-stroke duration-75">
                                            <svg aria-label="Guardar" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Guardar</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="mb-0">
                                <div className="overflow-visible m-auto content-stretch bg-transparent flex-col flex self-auto justify-start relative grow items-start flex-wrap">
                                    <span className="overflow-visible text-xs font-medium text-[#000000] dark:text-[#ffffff] wrap-break-word realtive block whitespace-pre-line leading-[18px]">
                                        <div role="button" className="text-decoration-none inline bg-transparent touch-manipulation cursor-pointer outline-none text-xs font-semibold text-[#000000] dark:text-[#ffffff]">
                                            1050 Me gusta
                                        </div>
                                    </span>
                                </div>
                            </section>
                            <div className="my-5">
                                <hr className="text-[#73737365]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article >
    );
}

export default Post

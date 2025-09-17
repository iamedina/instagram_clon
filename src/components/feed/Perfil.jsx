import { useState, useEffect } from "react";
import Footer from "../inicio/Footer";
import ModalFile from "./ModalFile";
import { supabase } from "../../supabaseClient";

function Perfil({ userId }) {
    const [user, setUser] = useState({ username: "", id: null });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            // Intentar token local primero
            const token = localStorage.getItem("token");
            let userData = null;

             const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            userData = {
                id: session.user.id,
                username: session.user.user_metadata?.name || session.user.email,
                fullName: session.user.user_metadata?.full_name || session.user.email,
                avatar: session.user.user_metadata?.avatar_url || ""
            };
        }

                if (!userData) {
            const token = localStorage.getItem("token");

                if (token) {
                    try {
                        const res = await fetch(`http://localhost/api/getUser.php?user_id=${userId}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        });
                        const data = await res.json();
                        if (data.success && data.user) {
                            userData = {
                                id: data.user.id,
                                username: data.user.username,
                                fullName: data.user.full_name,
                                avatar: data.user.avatar || "/img/profile.png"
                            };
                        }
                    } catch (err) {
                        console.error("Error local:", err);
                    }
                }
                }
            

            setUser(userData || { username: "", id: null, fullName: "", avatar: "" });
        };

        fetchUserData();
    }, [userId]);

    return (
        <>
            <div className="relative z-0 overflow-x-hidden">
                <div className="flex-col flex h-screen relative z-0 ">
                    <div className="flex flex-col relative top-0 ">
                        <div className="mb-[-100vh] flex flex-col relative z-0 ">
                            <div className=" bg-white flex static justify-between items-stretch h-screen flex-row self-auto grow-0 text-[0, 0, 0, 1] text-sm leading-[18px]">
                                <div className="w-[84%] max-md:w-full ml-auto nav-range">
                                    <section className=" flex-col flex-1 overflow-y-auto">
                                        <main className=" bg-white dark:bg-black dark:text-white justify-center flex-col flex grow overflow-y-auto min-h-0">
                                            <div className="w-[100%] mt-8.5 max-md:mt-20 flex justify-center items-stretch flex-row text-[#000000] dark:text-[#ffffff] text-sm leading-[18px] ">
                                                <div className="w-[100%]  max-w-[900px] mt-[12px] justify-center flex-col flex text-[rgb(0, 0, 0, 1)] grow ">
                                                    <div className="flex flex-col items-center w-full">
                                                        <div className="flex w-full items-center gap-x-25 pb-5 max-md:flex-col max-md:items-center">
                                                            <div className="flex justify-center items-center max-md:mb-4">
                                                                <img src="/img/profile.png" alt="avatar" className="w-38 h-38 max-md:w-28 max-md:h-28 rounded-full cursor-pointer border-2 bg-black border-black object-cover" />
                                                            </div>

                                                            <div className="flex flex-col">
                                                                <div className="flex items-center gap-4 mb-2 flex-wrap justify-center  md:justify-start">
                                                                    <div><h2 className="text-xl font-normal cursor-pointer ">{user?.username || "Usuario desconocido"}</h2></div>
                                                                    <div className="gap-2 flex">
                                                                        <div><button className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-black dark:text-white rounded text-xs font-semibold cursor-pointer ">Editar perfil</button></div>
                                                                        <div><button className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-black dark:text-white rounded text-xs font-semibold cursor-pointer ">Ver archivo</button></div>
                                                                        <div>
                                                                            <button className="flex justify-center items-center cursor-pointer ">
                                                                                <svg aria-label="Opciones" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Opciones</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-6 mb-2 mt-3 text-center max-md:flex max-md:gap-2">
                                                                    <span><strong>0</strong> <span className="text-gray-500 cursor-pointer "> publicaciones </span></span>
                                                                    <span><strong>0</strong> <span className="text-gray-500 cursor-pointer "> seguidores </span></span>
                                                                    <span><strong>0</strong> <span className="text-gray-500 cursor-pointer "> seguidos </span></span>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium my-5 cursor-pointer ">{user?.fullName || ""}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-start w-full mt-10">
                                                            <div className="flex flex-col items-center mb-8 cursor-pointer ">
                                                                <div className="w-20 h-20 border-3 border-gray-300 rounded-full flex items-center justify-center text-4xl text-gray-500 ">
                                                                    <svg aria-label="Icono &quot;más&quot;" fill="gray" height="44" role="img" viewBox="0 0 24 24" width="44"><title>Icono "más"</title><path d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z"></path></svg>
                                                                </div>
                                                                <p className="mt-2 text-sm">Nuevo</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-evenly w-full">
                                                            <div className="py-3 cursor-pointer ">
                                                                <a>
                                                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ color: 'rgb(var(--ig-primary-icon))' }}><title>Publicaciones</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M3 3H21V21H3z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M9.01486 3 9.01486 21"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M14.98514 3 14.98514 21"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M21 9.01486 3 9.01486"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M21 14.98514 3 14.98514"></path></svg>
                                                                </a>
                                                            </div>
                                                            <div className="py-3 cursor-pointer  text-gray-500">
                                                                <a>
                                                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ color: 'rgb(var(--ig-secondary-icon))' }}><title>Guardadas</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M20 21 12 13.44 4 21 4 3 20 3 20 21z"></path></svg>
                                                                </a>
                                                            </div>
                                                            <div className="py-3 cursor-pointer  text-gray-500">
                                                                <a>
                                                                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ color: 'rgb(var(--ig-secondary-icon))' }}><title>Etiquetadas</title><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px"></path><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px"><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none"></path><circle cx="12.07211" cy="11.07515" r="3.55556" fill="none"></circle></g></svg>
                                                                </a>
                                                            </div>

                                                        </div>
                                                        <hr className="text-gray-300 w-full" />
                                                        <div className="flex flex-col items-center my-15 text-black dark:text-white">
                                                            <div onClick={() => setOpen(true)} className=" rounded-full flex items-center justify-center text-4xl cursor-pointer ">
                                                                <svg aria-label="Cuando compartas fotos, aparecerán en tu perfil." class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62"><title>Cuando compartas fotos, aparecerán en tu perfil.</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></circle><ellipse cx="48.002" cy="49.524" fill="none" rx="10.444" ry="10.476" stroke="currentColor" stroke-linejoin="round" stroke-width="2.095"></ellipse><path d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                                                            </div>
                                                            <p className="mt-5 text-xl md:text-3xl font-bold text-center">Comparte fotos</p>
                                                            <p className="font-light mt-2 text-sm md:text-base text-center">Cuando compartas fotos, aparecerán en tu perfil.</p>
                                                            <button onClick={() => setOpen(true)} className="mt-4 text-blue-500 cursor-pointer hover:underline">Comparte tu primera foto</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </main>
                                        <Footer className="px-10" />
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalFile open={open} close={() => setOpen(false)} uploadSuccess={(post) => addPost(post)} />
        </>
    );
}

export default Perfil
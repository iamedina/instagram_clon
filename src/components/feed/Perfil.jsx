import { useState, useEffect } from "react";

function Perfil() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost/getUser.php", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) setUser({
                username: data.user.username,
                fullName: data.user.full_name
            });
        };

        fetchUserData();
    }, []);

    return (
        <div className="relative z-0 overflow-x-hidden">
            <div className="flex-col flex h-screen relative z-0 ">
                <div className="flex flex-col relative top-0 ">
                    <div className="mb-[-100vh] flex flex-col relative z-0 ">
                        <div className=" bg-white flex static justify-between items-stretch h-screen flex-row self-auto grow-0 text-[0, 0, 0, 1] text-sm leading-[18px]">
                            <div className="w-[84%] max-md:w-full ml-auto nav-range">
                                <section className=" flex-col flex-1 overflow-y-auto">
                                    <main className=" bg-white dark:bg-black dark:text-white justify-center flex-col flex grow overflow-y-auto min-h-0">
                                        <div className="w-[100%] mt-20 flex justify-center items-stretch flex-row text-[#000000] dark:text-[#ffffff] text-sm leading-[18px] ">
                                            <div className="w-[100%]  max-w-[630px] mt-[12px] justify-center flex-col flex text-[rgb(0, 0, 0, 1)] grow ">
                                                {user ? (
                                                    <>
                                                        <h2>Bienvenido, {user.fullName}</h2>
                                                        <p>Usuario: {user.username}</p>
                                                    </>
                                                ) : (
                                                    <p className="text-center">Cargando...</p>
                                                )}
                                            </div>
                                        </div>
                                    </main>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil
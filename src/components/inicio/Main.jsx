import Footer from "./Footer"
import ShowLogo from "./ShowLogo";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Home() {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [loading, setLoading] = useState(false);

    const isValid =
        password.length >= 6 && /[a-zA-Z-0-9]/.test(username);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/", { replace: true });
            } else {
                try {
                    const payload = JSON.parse(atob(token));
                    const now = Math.floor(Date.now() / 1000);

                    if (payload.exp < now) {
                        localStorage.removeItem("token");
                        navigate("/", { replace: true });
                    } else {
                        navigate("/home", { replace: true });
                    }
                } catch {
                    localStorage.removeItem("token");
                    navigate("/login", { replace: true });
                }
            }

            setShowSplash(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    const handleEntrar = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const resp = await fetch("http://localhost/api/enterCode.php", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "login",
                    emailPhone: username,
                    password: password
                })
            });

            const data = await resp.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.username));
                navigate("/home");
            } else {
                console.log(data.message || "Credenciales inválidas");
            }
        } catch (err) {
            console.error("Error de red:", err);
            console.log("Error de red. Revisa la consola.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Esto es el logo del principio de instagram */}
            {showSplash && <ShowLogo className={`transition-opacity duration-700 ${showSplash ? 'opacity-100' : 'opacity-0'}`} />}
            {!showSplash && ( 
            <div className="bg-white dark:bg-black dark:text-white">
                <div>
                    <section>
                        <main className="flex flex-col min-h-[80vh] flex-grow justify-center items-center mb-5 xl:mb-5 lg:mb-2.5">
                            <article className="flex mt-[32px] pb-[32px] gap-x-4 justify-center  flex-row items-center grow">
                                <div className=" mt-[30px] mb-[12px] flex justify-center  flex-col items-center ">
                                    <img src="../src/assets/img/imageLogin.png" width={576.4} className="ml-[-55px] object-fill block max-[945px]:hidden" />
                                </div>
                                <div className="max-w-[350px] mt-[38px] flex justify-center flex-col grow">
                                    <div className="mb-[10px] py-[10px] flex flex-col items-center relative">
                                        <div className="mt-[40px] overflow-visible  bg-transparent flex flex-col items-stretch self-auto justify-start relative grow-0 "> <i aria-label="Instagram" className="logosImg" role="img" style={{ backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yz/r/H_-3Vh0lHeK.png")', backgroundPosition: '0px -2959px', backgroundSize: 'auto', width: '175px', height: '51px', backgroundRepeat: 'no-repeat', display: 'inline-block' }}> </i> </div>
                                        <div className="max-w-[350px] mb-[12px]">
                                            <div>
                                                <form id="loginForm" onSubmit={handleEntrar} className="block max-[945px]:flex justify-center">
                                                    <div className="overflow-visible mt-[38px] flex flex-col items-stretch self-auto justify-start relative ">
                                                        <div className="spacing">
                                                            <div>
                                                                <label className="label1">
                                                                    <input aria-label="Teléfono, usuario o correo electrónico" placeholder="" className="inputName focus:outline-none" aria-required="true" value={username} onChange={(e) => setUsername(e.target.value)} autoCapitalize="off" autoCorrect="off" maxLength="75" type="text" name="username" />
                                                                    <span className="spanInput1">Teléfono, usuario o correo electrónico</span>
                                                                </label>
                                                                <div className="h-[100%] align-middle pr-[8px] basis-auto flex items-center flex-row relative "></div>
                                                            </div>
                                                        </div>
                                                        <div className="spacing">
                                                            <div>
                                                                <label className="label1">
                                                                    <input aria-label="Contraseña" placeholder="" className="inputName" aria-required="true" value={password} onChange={(e) => setpassword(e.target.value)} autoCapitalize="off" autoCorrect="off" maxLength="75" type={showPassword ? "text" : "password"} name="password" />
                                                                    <span className="spanInput1">Contraseña</span>
                                                                </label>
                                                                <div className="pr-[8px] flex flex-row relative grow-0  ">
                                                                    {password && (
                                                                        <div className="overflow-visible bg-transparent flex-col flex items-stretch justify-start absolute right-2 top-1/2 -translate-y-7 grow-0 ml-[8px]">
                                                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[rgb(12, 16, 20, 1)] hover:text-[#737373] bg-transparent border-0 inline-block relative p-0 text-center appearance-none bg-none cursor-pointer text-sm font-medium pointer-events-auto w-auto">
                                                                                {showPassword ? "Ocultar" : "Mostrar"}
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="h-[100%] align-middle pr-[8px] basis-auto flex items-center flex-row relative "></div>
                                                            </div>
                                                        </div>
                                                        <div className="my-[8px] mx-[40px] overflow-visible flex flex-col items-stretch relative justify-start">
                                                            <button type="submit" className={`btnLogin ${isValid ? 'opacity cursor-pointer btnLoginhover' : 'opacity-[.7]'}`} disabled={!isValid || loading}>
                                                                <div className="overflow-visible flex flex-col items-stretch relative justify-start text-[rgb(255, 255, 255, 1)]">
                                                                    {loading ? "Verificando..." : "Entrar"}
                                                                </div>
                                                            </button>
                                                        </div>
                                                        <div className="mt-[14px] mb-[22px] mx-[40px] text-[rgb(0, 0, 0, 1)]">
                                                            <div className="flex flex-row">
                                                                <div className="relative top-[6.3px] h-[1px] grow text-[rgb(0, 0, 0, 1)] bg-[#DBDBDB] dark:bg-[#dbdbdb27]"></div>
                                                                <div className="uppercase mx-[18px] flex-col flex font-semibold items-stretch text-[13px] relative grow-0 align-baseline text-[#737373] dark:text-[#a8a8a8e3]">o</div>
                                                                <div className="relative top-[6.3px] h-[1px] grow text-[rgb(0, 0, 0, 1)] bg-[#DBDBDB] dark:bg-[#dbdbdb27]"></div>
                                                            </div>
                                                        </div>
                                                        <div className="overflow-visible my-[8px] bg-transparent flex-col flex items-stretch justify-start grow-0 relative mx-[40px]  ">
                                                            <button type="button" className="border-0 text-[rgb(65, 80, 247, 1)] inline-block relative text-center bg-none cursor-pointer text-sm font-semibold pointer-events-auto w-auto m-0 ">
                                                                <div className="overflow-visible flex justify-center bg-transparent items-center flex-row relative ">
                                                                    <div className="overflow-visible flex flex-col items-stretch relative justify-start px-[4px] mr-[4px]">
                                                                        <svg aria-label="Iniciar sesión con Facebook" className="text-blue-500" fill="currentColor" height="20" role="img" viewBox="0 0 16 16" width="20"><title>Iniciar sesión con Facebook</title><g clipPath="url(#a)"><path d="M8 0C3.6 0 0 3.6 0 8c0 4 2.9 7.3 6.8 7.9v-5.6h-2V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V8h2.2l-.4 2.3H9.2v5.6C13.1 15.3 16 12 16 8c0-4.4-3.6-8-8-8Z" fill="currentColor"></path></g><defs><clipPath id="a"><rect fill="currentColor" height="16" width="16"></rect></clipPath></defs> </svg>
                                                                    </div>
                                                                    <span className="font-medium text-sm text-blue-500">
                                                                        Iniciar sesión con Facebook
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span>
                                                            <div>

                                                            </div>
                                                        </span>
                                                    </div>
                                                    <div className="overflow-visible mt-[12px] bg-transparent flex flex-col self-center static items-stretch justify-start grow-0 ">
                                                        <a to="" className="h-auto font-medium appearance-none basis-auto inline-flex items-center justify-center cursor-pointer flex-row relative leading-[18px] decoration-none outline-none text-[14px] hover:underline text-[#0C1014] dark:text-white">
                                                            ¿Has olvidado la contraseña?
                                                        </a>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-[10px] flex flex-col items-center relative align-baseline text-inherit text-[rgb(0, 0, 0, 1)]">
                                        <span className="overflow-visible text-sm font-normal wrap-break-word text-[115, 115, 115, 1] relative block leading-[18px] wrap-break-word ">
                                            <p className="m-[15px] text-center text-sm text-black dark:text-white">
                                                ¿No tienes una cuenta?
                                                <a onClick={() => navigate('/register')} className="decoration-none mx-1 bg-transparent cursor-pointer text-[#4150F7] dark:text-white">
                                                    <span className="leading-[18px] min-w-0 max-w-[100%] text-sm inline wrap-break-word font-medium cursor-pointer whitespace-pre-line text-[#4150F7] dark:text-[#7581ff]">
                                                        Regístrate
                                                    </span>
                                                </a>
                                            </p>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </main>
                    </section>
                    <Footer />
                </div>
            </div>
            )}
        </div>
    )
}

export default Home

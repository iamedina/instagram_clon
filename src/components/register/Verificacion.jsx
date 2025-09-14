import Footer from "../inicio/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CodigoVerificacion() {

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();
    const isValid = code.length >= 6;

    // Validar código contra el backend
    const handleVerify = async () => {
        if (!isValid) return;

        setLoading(true);
        setMsg("");

        try {
            const registro = JSON.parse(localStorage.getItem("registro"));
            const tempCode = localStorage.getItem("tempCode");
            const codeExpires = parseInt(localStorage.getItem("codeExpires"), 10);

            // Verificar si hay código y si no ha expirado
            if (!tempCode || !codeExpires) {
                setMsg("No hay código activo. Solicita uno nuevo.");
                setLoading(false);
                return;
            }

            if (Date.now() > codeExpires) {
                setMsg("El código ha expirado. Solicita uno nuevo.");
                setLoading(false);
                return;
            }

            // Comparar código
            if (code !== tempCode) {
                setMsg("Código incorrecto");
                setLoading(false);
                return;
            }

            console.log("✅ Código correcto");

            const registroCode = {
                ...registro,       // copia todos los campos existentes
                codeVerified: true // indica que el código ya fue verificado
            }

            const registerResponse = await fetch("http://localhost/api/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token") || ""}` },
                body: JSON.stringify(registroCode),
            });

            const registerData = await registerResponse.json();

            if (registerData.success) {
                setMsg("✅ Registro completado con éxito");
                console.log("✅ Registro completado con éxito");

                localStorage.setItem("token", registerData.token);
                localStorage.setItem("user", JSON.stringify(registerData.user));

                localStorage.removeItem("registro");
                navigate('/home');
            } else {
                setMsg(registerData.message);
                console.log(registerData.message);
            }
        } catch (error) {
            console.error("Error de conexión con el servidor", error);
            setMsg("Error de conexión con el servidor");
        }

        setLoading(false);
    };

    const handleResendCode = async () => {
        setLoading(true);
        setMsg("");
        try {
            const response = await fetch("http://localhost/api/code.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "resend",
                    emailPhone: registro.emailPhone,
                }),
            });
            const data = await response.json();
            if (data.success) {
                setMsg(data.message);

                if (data.emailPhone && data.code && data.expiresIn) {

                    localStorage.setItem("emailVerify", data.emailPhone);
                    localStorage.setItem("tempCode", data.code);
                    localStorage.setItem("codeExpires", Date.now() + data.expiresIn * 1000);
                }
            } else {
                setMsg(data.message);
            }
        } catch (error) {
            setMsg("Error de conexión con el servidor");
        }
        setLoading(false);
    };


    const registro = JSON.parse(localStorage.getItem("registro"));
    const emailVerify = localStorage.getItem("emailVerify") || registro?.emailPhone;

    useEffect(() => {
        if (!registro) {
            navigate("/register", { replace: true });
        }
    }, []);



    return (
        <div className="relative z-0">
            <div className="flex-col flex relative z-0 ">
                <div className="flex flex-col relative top-0 min-h-screen">
                    <div className="mb-[-100vh] flex flex-col relative z-0">
                        <div className="overflow-visible h-[100%] bg-white flex static justify-between items-stretch flex-row self-auto grow-0 text-[0, 0, 0, 1] text-sm leading-[18px]">
                            <div className="w-[100%]">
                                <section className="min-h-screen flex-col flex">
                                    <main className="bg-white dark:bg-black dark:text-white justify-center flex-col flex grow ">
                                        <div className="mb-[44px] overflow-hidden flex justify-center bg-transparent items-center flex-row self-auto relative grow text-[#0000000] text-sm leading-[18px]">
                                            <div className="w-[100%] max-w-[350px] mt-[12px] justify-center flex-col flex grow" style={{ color: 'rgb(0, 0, 0, 1)' }}>
                                                <div className="mb-[10px] py-[10px] flex-col flex items-center relative align-baseline border-[1px] border-[#DBDBDB] dark:border-[#dbdbdb42]" style={{ color: 'rgb(0, 0, 0, 1)' }}>
                                                    <div>
                                                        <div className="max-w-[350px] py-[8px] overflow-visible px-[28px] bg-transparent flex flex-col items-center self-auto justify-start relative text-[100%]">
                                                            <i data-visualcompletion="css-img" aria-label="Confirmación del correo electrónico" className="max-w-[350px] logosImg" role="img" style={{ backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yz/r/H_-3Vh0lHeK.png")', backgroundPosition: '-239px -1565px', backgroundSize: 'auto', width: '96px', height: '96px', backgroundRepeat: 'no-repeat', display: 'inline-block' }}></i>
                                                            <div className="mt-[16px] overflow-visible mb-[8px] bg-transparent flex items-stretch self-auto justify-start relative grow-0">
                                                                <span className="overflow-visible text-[12.5px] text-[#000000] dark:text-white text-center wrap-break-word font-semibold relative whitespace-pre-line leading-[18px] ">
                                                                    Introduce el código de confirmación
                                                                </span>
                                                            </div>
                                                            <div className="my-[10px] overflow-visible bg-transparent inline-block self-auto relative grow-0">
                                                                <span className="min-w-0 max-w-[100%] overflow-visible text-[12.5px] font-normal text-center text-[#000000] dark:text-white wrap-break-word relative block whitespace-pre-line leading-[18px]">
                                                                    Introduce el código de confirmación que <br /> hemos enviado a {emailVerify} <br />
                                                                    <div onClick={handleResendCode} role="button" tabIndex="0" className="min-w-0 border-none inline font-medium hover:underline appearance-none bg-transparent touch-manipulation items-center text-center cursor-pointer relative z-0 text-[12.5px] leading-[18px] decoration-0 outline-none text-[#3143E3] dark:text-[#708DFF]" style={{ border: '43, 48, 54, 0.8' }}>
                                                                        Reenviar código.
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="overflow-visible bg-transparent flex flex-col self-auto justify-start relative grow-0">
                                                            <form method="POST">
                                                                <div className="max-w-[350px] my-[8px] overflow-visible px-[40px] bg-transparent flex flex-col items-center self-auto justify-start relative text-[100%]">
                                                                    <div className="overflow-visible w-[100%] bg-transparent flex items-stretch flex-col self-auto justify-start relative grow-0 text-[#000000]">
                                                                        <input aria-label="Código de confirmación" autoComplete="off" className="outline-none bg-[#FAFAFA] dark:bg-[#121212] dark:border-[#5555555d] dark:text-[#A8A8A8] border border-[#DBDBDB] w-[268px] rounded-[6px] text-[#000000e7] grow text-[13px] dark:focus:border-[#6b6b6bcc] dark:focus:text-white leading-[30px] m-0 overflow-visible py-[4px] px-[12px] text-left" dir="" maxLength="8" placeholder="Código de confirmación" spellCheck="true" type="text" value={code} onChange={(e) => setCode(e.target.value)} name="email_confirmation_code" />
                                                                    </div>
                                                                    {msg && (
                                                                        <div
                                                                            className={`text-center mt-2 ${msg.includes("✅")
                                                                                ? "text-green-600"
                                                                                : "text-red-600"
                                                                                }`}
                                                                        >
                                                                            {msg}
                                                                        </div>
                                                                    )}
                                                                    <div className="my-[16px] grow-0 w-[100%] overflow-visible flex flex-col items-stretch self-auto relative justify-start">
                                                                        <div onClick={handleVerify} role="button" className={`btnSiguiente transition-all duration-300 ${isValid ? 'opacity cursor-pointer btnLoginhover' : 'opacity-[.4]'}`} disabled={!isValid}>
                                                                            {loading ? "Verificando..." : "Siguiente"}
                                                                        </div>
                                                                    </div>
                                                                    <div className="overflow-visible mb-[8px] hover:underline dark:hover:text-[#708dffc4] bg-transparent flex flex-col items-stretch self-auto justify-start relative grow-0 ">
                                                                        <button type="button" onClick={() => navigate('/register')} className="border-0 m-0 inline-block btnAtras p-0 relative text-center appearance-none bg-none cursor-pointer text-sm font-medium pointer-events-auto w-auto leading-[18px] text-[#4150F7] dark:text-[#708DFF] ">
                                                                            Atrás
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" py-[10px] flex-col flex items-center relative align-baseline border-[1px] border-[#DBDBDB] dark:border-[#dbdbdb42]">
                                                    <p className="m-[15px] text-black dark:text-white text-center text-sm ">
                                                        ¿Tienes una cuenta?
                                                        <a onClick={() => navigate('/login')} className="no-underline inline bg-transparent touch-manipulation cursor-pointer text-[#4150F7] dark:text-[#708DFF] outline-none">
                                                            <span className="overflow-visible min-w-0 max-w-[100%] text-sm wrap-break-word font-medium relative block whitespace-pre-line ">
                                                                Entrar
                                                            </span>
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </main>
                                    <Footer />
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodigoVerificacion
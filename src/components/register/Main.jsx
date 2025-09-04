import Footer from "../inicio/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RiFacebookBoxFill } from "react-icons/ri";

function Register() {

    const [emailPhone, setEmailPhone] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");

    const [errors, setErrors] = useState({
        emailPhone: "",
        password: "",
        fullName: "",
        username: "",
    });

    const [touched, setTouched] = useState({
        emailPhone: false,
        password: false,
        fullName: false,
        username: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");

    //Guarda los datos en registro para el siguiente paso
    useEffect(() => {
        const registro = JSON.parse(localStorage.getItem("registro"));
        if (registro) {
            setEmailPhone(registro.emailPhone || "")
            setFullName(registro.fullName || "");
            setUsername(registro.username || "");
        }
    //Aqui guarda los datos en registerData temporalmente para mantener los input rellenos y se borran cuando no lo necesito
        const savedData = localStorage.getItem("registerData");
        if (savedData) {
            const { emailPhone, password, fullName, username } = JSON.parse(savedData);
            setEmailPhone(emailPhone);
            setPassword(password);
            setFullName(fullName);
            setUsername(username);

            localStorage.removeItem("registerData");
        }
    }, []);

    useEffect(() => {
        localStorage.removeItem("registro");
    }, []);


    //Este es el que gurda los datos de este paso para el paso siguiente
    const handleGo = (e) => {
        e.preventDefault();

        const registro = JSON.parse(localStorage.getItem("registro")) || {};
        registro.emailPhone = emailPhone;
        registro.password = password;
        registro.fullName = fullName;
        registro.username = username;
        localStorage.setItem("registro", JSON.stringify(registro));

        // Pasar al siguiente paso
        navigate("/birthday");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost/api/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailPhone, password, fullName, username })
            });

            let data;
            const text = await res.text();

            try {
                data = JSON.parse(text);
            } catch (e) {
                setMsg("Respuesta inesperada del servidor: " + text);
                setMsgType("error");
                return;
            }
            setMsg(data.message);
            setMsgType(data.success ? "success" : "error");
        } catch (err) {
            console.error("Error al conectar con backend:", err);
            setMsg("Error al conectar con el servidor");
            setMsgType("error");
        }
    };

    const navigate = useNavigate();

    const isValid = () => {
        return (
            emailPhone.trim() !== "" &&
            password.trim().length >= 6 &&
            fullName.trim() !== "" &&
            username.trim() !== "" &&
            Object.values(errors).every(error => error === "")
        );
    }

    //Validar email o celular
    const validateEmailPhone = (value) => {

        const phoneValid = /^(\+?\d{10,15})$/;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value) {
            setErrors((prev) => ({ ...prev, emailPhone: "Este campo es obligatorio" }));
        } else if (phoneValid.test(value)) {
            setErrors((prev) => ({ ...prev, emailPhone: "" }));
        } else if (emailValid.test(value)) {
            setErrors((prev) => ({ ...prev, emailPhone: "" }));
        } else {
            // Si empieza con número, error de celular
            if (/^\+?\d/.test(value)) {
                setErrors((prev) => ({ ...prev, emailPhone: "Parece que tu número de teléfono es incorrecto. Prueba a escribir el número completo, incluido el prefijo del país." }));
            } else {
                // Sino, se piensa que intenta escribir un correo
                setErrors((prev) => ({ ...prev, emailPhone: "Introduzca una dirección de correo electrónico válida." }));
            }
        }
    };

    //Validar password
    const validatePassword = (value) => {

        if (!value) {
            setErrors((prev) => ({ ...prev, password: "Crea una contraseña que tenga al menos 6 caracteres." }));
        } else if (value.length >= 6) {
            setErrors((prev) => ({ ...prev, password: "" }));
        } else {
            setErrors((prev) => ({ ...prev, password: "Crea una contraseña que tenga al menos 6 caracteres." }));
        }
    };

    // Función para validar username
    const validateUsername = async (value) => {
        const usernameValid = /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-zA-Z0-9._]{1,30}$/;

        if (!value) {
            return "Este campo es obligatorio";
        }

        if (!usernameValid.test(value)) {
            return "Este nombre de usuario no está disponible. Prueba otro.";
        }

        try {
            const res = await fetch(`http://localhost/api/validar.php?username=${value}`);
            const data = await res.json();

            if (data.exists) {
                return "Ya existe un usuario con ese nombre.";
            } else {
                return "";
            }
        } catch (err) {
            console.error("Error al verificar username:", err);
            return "No se pudo verificar el nombre de usuario.";
        }
    };

    const handleBlur = async () => {
        setTouched(prev => ({ ...prev, username: true }));
        const errorMessage = await validateUsername(username);
        setErrors(prev => ({ ...prev, username: errorMessage }));
    };

    return (
        <div className="relative z-0 ">
            <div className="flex-col flex relative z-0 ">
                <div className="flex flex-col relative top-0 min-h-screen">
                    <div className="mb-[-100vh] flex flex-col relative z-0">
                        <div className="overflow-visible h-[100%] bg-white flex static justify-between items-stretch flex-row self-auto grow-0 text-[0, 0, 0, 1] text-sm leading-[18px]">
                            <div className="w-[100%]">
                                <section className="min-h-screen flex-col flex">
                                    <main className="bg-white dark:bg-black dark:text-white justify-center flex-col flex grow ">
                                        <div className="mb-[44px] overflow-hidden flex justify-center bg-transparent items-center flex-row self-auto relative grow ">
                                            <div className="w-[100%] max-w-[350px] mt-[12px] justify-center flex-col flex text-[rgb(0, 0, 0, 1)] grow">
                                                <div className="mb-[10px] py-[10px] flex-col flex items-center relative align-baseline border-[1px] border-[#DBDBDB] dark:border-[#dbdbdb42]" style={{ color: 'rgb(0, 0, 0, 1)' }}>
                                                    <div className="mt-[36px] overflow-visible mb-[12px] bg-transparent flex-col flex items-stretch self-auto justify-start grow-0 text-[0, 0, 0, 1]">
                                                        <i aria-label="Instagram" className="logosImg" role="img" style={{ backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yz/r/H_-3Vh0lHeK.png")', backgroundPosition: '0px -2959px', backgroundSize: 'auto', width: '175px', height: '51px', backgroundRepeat: 'no-repeat', display: 'inline-block' }}></i>
                                                    </div>
                                                    <div>
                                                        <div className="mb-[20px] text-inherit" style={{ color: 'rgb(0, 0, 0, 1)' }} >
                                                            <form onSubmit={handleGo} className="border-0 flex flex-col text-inherit m-0 max-w-[350px] p-0 align-baseline">
                                                                <div style={{ margin: '0px 40px 10px 40px' }}>
                                                                    <h4 className="overflow-visible min-w-0 text-center wrap-break-word font-medium relative block whitespace-pre-line leading-[20px] text-[#737373] dark:text-[#A8A8A8]">
                                                                        Regístrate para ver fotos y vídeos de tus amigos.
                                                                    </h4>
                                                                </div>
                                                                <div className="overflow-visible my-[8px] bg-transparent flex-col flex items-stretch self-auto justify-start relative grow-0 mx-[40px]">
                                                                    <button className="btnFace">
                                                                        <span className="logoFace">
                                                                            <RiFacebookBoxFill className="text-xl" />
                                                                        </span>
                                                                        Iniciar sesión con Facebook
                                                                    </button>
                                                                </div>
                                                                <div style={{ margin: '10px 40px 18px 40px' }}>
                                                                    <div className="flex flex-row">
                                                                        <div className="relative top-[6.3px] h-[1px] grow text-[rgb(0, 0, 0, 1)] " style={{ background: 'rgb(219, 219, 219, 1)' }}></div>
                                                                        <div className="uppercase mx-[18px] flex-col flex font-semibold items-stretch text-[13px] relative grow-0 align-baseline " style={{ color: 'rgb(115, 115, 115, 1)' }}>o</div>
                                                                        <div className="relative top-[6.3px] h-[1px] grow text-[rgb(0, 0, 0, 1)] " style={{ background: 'rgb(219, 219, 219, 1)' }}></div>
                                                                    </div>
                                                                </div>
                                                                <div className="spacing">
                                                                    <div>
                                                                        <label className="label1">
                                                                            <input aria-label="Teléfono, usuario o correo electrónico" placeholder="" className={`inputName border dark:bg-[#0C1014] dark:text-white transition-all duration-300 ease-in-out opacity-100 max-h-10 focus:outline-none ${touched.emailPhone && errors.emailPhone ? '!border-red-500' : '!border-[#555555]'}`} aria-required="true" value={emailPhone} onChange={(e) => { setEmailPhone(e.target.value); if (touched.emailPhone) { setErrors({ ...errors, emailPhone: validateEmailPhone(e.target.value) }) } }} onBlur={(e) => { setTouched(prev => ({ ...prev, emailPhone: true })); setErrors(prev => ({ ...prev, emailPhone: validateEmailPhone(e.target.value) })) }} autoCapitalize="off" autoCorrect="off" maxLength="75" type="text" name="emailPhone" required />
                                                                            <span className="spanInput1">Número de móvil o correo electrónico</span>
                                                                        </label>
                                                                        <div className="h-[100%] align-middle pr-[8px] basis-auto flex items-center flex-row relative "></div>
                                                                    </div>
                                                                    {touched.emailPhone && errors.emailPhone && (
                                                                        <div>
                                                                            <p className="text-red-500 text-[11px] ml-[10px] mt-1 mb-2 leading-[15px]  transition-all duration-300 ease-in-out max-h-10">{errors.emailPhone}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="spacing">
                                                                    <div>
                                                                        <label className="label1">
                                                                            <input aria-label="Contraseña" placeholder="" className={`inputName border ${errors.password ? '!border-red-500' : '!border-[#555555]'}`} aria-required="true" value={password} onChange={(e) => { setPassword(e.target.value); if (touched.password) { validatePassword(e.target.value) } }} onBlur={(e) => { setTouched(prev => ({ ...prev, password: true })); setErrors(prev => ({ ...prev, password: validatePassword(e.target.value) })) }} autoCapitalize="off" autoCorrect="off" maxLength="75" type={showPassword ? "text" : "password"} name="password" required />
                                                                            <span className="spanInput1">Contraseña</span>
                                                                        </label>
                                                                        <div className="pr-[8px] flex flex-row relative grow-0  ">
                                                                            {password && (
                                                                                <div className="overflow-visible bg-transparent flex-col flex items-stretch justify-start absolute right-2 top-1/2 -translate-y-7 grow-0 ml-[8px]">
                                                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[#0C1014] dark:text-white hover:text-[#737373] bg-transparent border-0 inline-block relative p-0 text-center appearance-none bg-none cursor-pointer text-sm font-medium pointer-events-auto w-auto">
                                                                                        {showPassword ? "Ocultar" : "Mostrar"}
                                                                                    </button>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="h-[100%] align-middle pr-[8px] basis-auto flex items-center flex-row relative "></div>
                                                                    </div>
                                                                    {touched.password && errors.password && (
                                                                        <div>
                                                                            <p className="text-red-500 text-[11px] ml-[10px] mt-1 mb-2 leading-[15px]">{errors.password}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="spacing">
                                                                    <div>
                                                                        <label className="label1">
                                                                            <input aria-label="Teléfono, usuario o correo electrónico" placeholder="" className="inputName focus:outline-none" aria-required="true" value={fullName} onChange={(e) => setFullName(e.target.value)} autoCapitalize="off" autoCorrect="off" maxLength="75" type="text" name="fullName" required />
                                                                            <span className="spanInput1">Nombre completo</span>
                                                                        </label>
                                                                        <div className="h-[100%] align-middle pr-[8px] basis-auto flex items-center flex-row relative "></div>
                                                                    </div>
                                                                </div>
                                                                <div className="spacing">
                                                                    <div>
                                                                        <label className="label1">
                                                                            <input aria-label="Teléfono, usuario o correo electrónico" placeholder="" className={`inputName border focus:outline-none ${touched.username && errors.username ? '!border-red-500' : '!border-[#555555]'}`} aria-required="true" value={username} onChange={(e) => { setUsername(e.target.value); if (touched.username) { validateUsername(e.target.value) } }} onBlur={handleBlur} autoCapitalize="off" autoCorrect="off" maxLength="75" type="text" name="username" required />
                                                                            <span className="spanInput1">Nombre de usuario</span>
                                                                        </label>
                                                                        <div className="h-[100%] align-middle pr-[8px] basis-auto flex items-center flex-row relative "></div>
                                                                    </div>
                                                                    {touched.username && errors.username && (
                                                                        <div>
                                                                            <p className="text-red-500 text-[11px] ml-[10px] mt-1 mb-2 leading-[15px]">{errors.username}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>{msg && <p className={`text-center mt-2  text-[11px] mx-[40px] ${msgType === "error" ? "text-red-600" : "text-green-600"}`}>{msg}</p>}</div>
                                                                <p className="text-xs leading-[16px] text-center text-[#737373] dark:text-[#A8A8A8]" style={{ margin: '10px 40px' }}>
                                                                    <span className="overflow-visible min-w-0 max-w-[100%] font-medium wrap-break-word relative block text-xs leading-[16px] text-[#737373] dark:text-[#A8A8A8]">
                                                                        <span className="leading-[16px] inline font-medium whitespace-pre-line text-xs text-[#737373] dark:text-[#A8A8A8]">
                                                                            Es posible que los usuarios de nuestro servicio hayan subido tu información de contacto en Instagram.&nbsp;
                                                                            <a className="no-underline inline bg-transparent touch-manipulation cursor-pointer text-[#4150F7] dark:text-[#708DFF]">
                                                                                Más información
                                                                            </a>
                                                                        </span>
                                                                        <br />
                                                                        <br />
                                                                        Al registrarte, aceptas nuestras
                                                                        <a className="no-underline inline bg-transparent touch-manipulation cursor-pointer text-[#4150F7] dark:text-[#708DFF]">
                                                                            Condiciones
                                                                        </a>
                                                                        , nuestra&nbsp;
                                                                        <a className="no-underline inline bg-transparent touch-manipulation cursor-pointer text-[#4150F7] dark:text-[#708DFF]">
                                                                            Política de privacidad&nbsp;
                                                                        </a>
                                                                        y nuestra&nbsp;
                                                                        <a className="no-underline inline bg-transparent touch-manipulation cursor-pointer text-[#4150F7] dark:text-[#708DFF]">
                                                                            Política de cookies
                                                                        </a>
                                                                        .
                                                                    </span>
                                                                </p>
                                                                <div>
                                                                    <div className="my-[8px] mx-[40px] overflow-visible flex flex-col items-stretch relative justify-start">
                                                                        <button type="submit" className={`btnRegister ${isValid() ? 'opacity cursor-pointer btnLoginhover' : 'opacity-[.7]'}`} disabled={!isValid()}>
                                                                            Registrarte
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
                                                            <span className="overflow-visible min-w-0 max-w-[100%] text-sm wrap-break-word font-semibold relative block whitespace-pre-line ">
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

export default Register
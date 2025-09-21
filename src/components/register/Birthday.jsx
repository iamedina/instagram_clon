import Footer from "../inicio/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Birthday() {

    const hoy = new Date();
    hoy.setFullYear(hoy.getFullYear() - 1);

    const defaultDay = hoy.getDate();
    const defaultMonth = hoy.getMonth() + 1;
    const defaultYear = hoy.getFullYear();

    const [day, setDay] = useState(defaultDay);
    const [month, setMonth] = useState(defaultMonth);
    const [year, setYear] = useState(defaultYear);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    const isValid = year !== "" && Number(year) <= 2020 && day && month && year;

    const handleGoBirthday = async (e) => {
        e.preventDefault();

        // Calcular edad apartir de los 13 años
        const birthdate = new Date(year, month - 1, day);
        let age = hoy.getFullYear() - birthdate.getFullYear();
        const monthDiff = hoy.getMonth() - birthdate.getMonth();
        const dayDiff = hoy.getDate() - birthdate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        if (age < 13) {
            setMsg("De acuerdo con la información que proporcionaste, no puedes registrarte en Instagram.");
            return;
        }

        setLoading(true);

        const registro = JSON.parse(localStorage.getItem('registro')) || {};
        registro.birthdate = { day, month, year };
        localStorage.setItem('registro', JSON.stringify(registro));

        const emailPhone = registro.emailPhone;

        const isEmail = /\S+@\S+\.\S+/.test(emailPhone);
        const isPhone = /^[0-9]{10,15}$/.test(emailPhone);

        try {
            // Llamar a PHP para enviar el código solo si es correo 
            if (isEmail) {
                const response = await fetch("https://redsocial-api.wasmer.app/code.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ emailPhone: registro.emailPhone }),
                });

                const data = await response.json();

                if (data.success) {
                    console.log("✅ Código enviado al correo");
                    navigate("/codigo");
                } else {
                    console.error("Error al enviar código:", data.msg);
                }

            } else if (isPhone) {
                // Si es numero de celular, registrar directamente
                const response = await fetch("https://redsocial-api.wasmer.app/register.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registro),
                });

                const data = await response.json();

                if (data.success === true || data.success === "true") {
                    console.log("✅ Usuario registrado correctamente");
                    
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));

                    localStorage.removeItem('registro');
                    navigate("/home");
                } else {
                    setMsg(data.msg);
                    console.error("Error al registrar:", data.msg);
                }

            } else {
                console.error("Dato no válido (ni email ni teléfono)");
            }
        } catch (error) {
            console.error("Error de red:", error);
        }

        setLoading(false);
    };

    const registro = JSON.parse(localStorage.getItem("registro"));

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
                                        <div className="mb-[44px] overflow-hidden flex justify-center bg-transparent items-center flex-row self-auto relative grow ">
                                            <div className="w-[100%] max-w-[350px] mt-[12px] justify-center flex-col flex grow" style={{ color: 'rgb(0, 0, 0, 1)' }}>
                                                <div className="mb-[10px] py-[10px] flex-col flex items-center relative align-baseline border-[1px] border-[#DBDBDB] dark:border-[#dbdbdb42]" style={{ color: 'rgb(0, 0, 0, 1)' }}>
                                                    <div>
                                                        <div className="py-[8px] overflow-visible max-w-[350px] px-[28px] bg-transparent flex-col flex items-center self-auto justify-start relative ">
                                                            <i data-visualcompletion="css-img" aria-label="Pastelillo de cumpleaños" role="img" style={{ backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yz/r/H_-3Vh0lHeK.png")', backgroundPosition: '0px -3011px', backgroundSize: 'auto', width: '144px', height: '96px', backgroundRepeat: 'no-repeat', display: 'inline-block' }} />
                                                            <div className="mt-[16px] overflow-visible mb-[5px] bg-transparent items-stretch justify-start relative grow-0 ">
                                                                <span className="overflow-visible min-w-0 max-w-[100%] text-[12.5px] dark:text-white text-center wrap-break-word font-semibold relative block whitespace-pre-line leading-[18px] ">
                                                                    Añade tu fecha de nacimiento
                                                                </span>
                                                            </div>
                                                            <div className="mt-[16px] overflow-visible bg-transparent flex self-auto items-stretch justify-start relative grow-0 ">
                                                                <span className="overflow-visible min-w-0 max-w-[100%] text-[12.5px] text-[#000000] dark:text-white text-center wrap-break-word font-normal relative block whitespace-pre-line leading-[18px] ">
                                                                    Este dato no se incluirá en tu perfil público.
                                                                </span>
                                                            </div>
                                                            <div className="overflow-visible mb-[8px] bg-transparent flex flex-col items-stretch justify-start relative ">
                                                                <button className="border-0 inline-block p-0 relative text-center m-0 appearance-none bg-none cursor-pointer text-[12.5px] font-semibold pointer-events-auto w-auto text-[#4150F7]">
                                                                    <span className="overflow-visible max-w-[100%] text-[12.5px] text-[#4150F7] dark:text-[#708DFF] font-normal wrap-break-word relative block leading-[18px]" >
                                                                        ¿Por qué tengo que facilitar mi fecha de nacimiento?
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <div>
                                                                        <span className="flex justify-center" style={{ color: 'rgb(0, 0, 0, 1)' }}>
                                                                            <span className="mb-[8px] mr-[10px] border-0 inline-block text-inherit m-0 p-0 relative align-baseline">
                                                                                <select className="rounded-[3px] text-xs h-[36px] py-0 pl-[4px] overflow-auto active:border-red-500 bg-[#ffffff] border border-[#DBDBDB] text-[737373] dark:bg-black dark:border-[#55555577]  dark:text-[#A8A8A8] " title="Mes:" value={month} onChange={(e) => setMonth(parseInt(e.target.value))}><option title="enero" value="1">enero</option><option title="febrero" value="2">febrero</option><option title="marzo" value="3">marzo</option><option title="abril" value="4">abril</option><option title="mayo" value="5">mayo</option><option title="Junio" value="6">Junio</option><option title="julio" value="7">julio</option><option title="ago." value="8">ago.</option><option title="septiembre" value="9">septiembre</option><option title="octubre" value="10">octubre</option><option title="noviembre" value="11">noviembre</option><option title="diciembre" value="12">diciembre</option></select>
                                                                            </span>
                                                                            <span className="mb-[8px] mr-[10px] border-0 inline-block text-inherit m-0 p-0 relative align-baseline">
                                                                                <select className="rounded-[3px] text-xs h-[36px] py-0 pr-[3px] pl-[4px] overflow-auto active:border-red-500 bg-[#ffffff] border border-[#DBDBDB] text-[737373] dark:bg-black dark:border-[#55555577]  dark:text-[#A8A8A8] " title="Día:" value={day} onChange={(e) => setDay(parseInt(e.target.value))}><option title="1" value="1">1</option><option title="2" value="2">2</option><option title="3" value="3">3</option><option title="4" value="4">4</option><option title="5" value="5">5</option><option title="6" value="6">6</option><option title="7" value="7">7</option><option title="8" value="8">8</option><option title="9" value="9">9</option><option title="10" value="10">10</option><option title="11" value="11">11</option><option title="12" value="12">12</option><option title="13" value="13">13</option><option title="14" value="14">14</option><option title="15" value="15">15</option><option title="16" value="16">16</option><option title="17" value="17">17</option><option title="18" value="18">18</option><option title="19" value="19">19</option><option title="20" value="20">20</option><option title="21" value="21">21</option><option title="22" value="22">22</option><option title="23" value="23">23</option><option title="24" value="24">24</option><option title="25" value="25">25</option><option title="26" value="26">26</option><option title="27" value="27">27</option><option title="28" value="28">28</option><option title="29" value="29">29</option><option title="30" value="30">30</option><option title="31" value="31">31</option></select>
                                                                            </span>
                                                                            <span className="border-0 inline-block text-inherit m-0 p-0 relative align-baseline">
                                                                                <select className="rounded-[3px] text-xs h-[36px] py-0 pr-[6px] pl-[4px] overflow-auto active:border-red-500 bg-[#ffffff] border border-[#DBDBDB] text-[737373] dark:bg-black dark:border-[#55555577]  dark:text-[#A8A8A8] " title="Año:" value={year} onChange={(e) => setYear(parseInt(e.target.value))}><option title="2025" value="2025">2025</option><option title="2024" value="2024">2024</option><option title="2023" value="2023">2023</option><option title="2022" value="2022">2022</option><option title="2021" value="2021">2021</option><option title="2020" value="2020">2020</option><option title="2019" value="2019">2019</option><option title="2018" value="2018">2018</option><option title="2017" value="2017">2017</option><option title="2016" value="2016">2016</option><option title="2015" value="2015">2015</option><option title="2014" value="2014">2014</option><option title="2013" value="2013">2013</option><option title="2012" value="2012">2012</option><option title="2011" value="2011">2011</option><option title="2010" value="2010">2010</option><option title="2009" value="2009">2009</option><option title="2008" value="2008">2008</option><option title="2007" value="2007">2007</option><option title="2006" value="2006">2006</option><option title="2005" value="2005">2005</option><option title="2004" value="2004">2004</option><option title="2003" value="2003">2003</option><option title="2002" value="2002">2002</option><option title="2001" value="2001">2001</option><option title="2000" value="2000">2000</option><option title="1999" value="1999">1999</option><option title="1998" value="1998">1998</option><option title="1997" value="1997">1997</option><option title="1996" value="1996">1996</option><option title="1995" value="1995">1995</option><option title="1994" value="1994">1994</option><option title="1993" value="1993">1993</option><option title="1992" value="1992">1992</option><option title="1991" value="1991">1991</option><option title="1990" value="1990">1990</option><option title="1989" value="1989">1989</option><option title="1988" value="1988">1988</option><option title="1987" value="1987">1987</option><option title="1986" value="1986">1986</option><option title="1985" value="1985">1985</option><option title="1984" value="1984">1984</option><option title="1983" value="1983">1983</option><option title="1982" value="1982">1982</option><option title="1981" value="1981">1981</option><option title="1980" value="1980">1980</option><option title="1979" value="1979">1979</option><option title="1978" value="1978">1978</option><option title="1977" value="1977">1977</option><option title="1976" value="1976">1976</option><option title="1975" value="1975">1975</option><option title="1974" value="1974">1974</option><option title="1973" value="1973">1973</option><option title="1972" value="1972">1972</option><option title="1971" value="1971">1971</option><option title="1970" value="1970">1970</option><option title="1969" value="1969">1969</option><option title="1968" value="1968">1968</option><option title="1967" value="1967">1967</option><option title="1966" value="1966">1966</option><option title="1965" value="1965">1965</option><option title="1964" value="1964">1964</option><option title="1963" value="1963">1963</option><option title="1962" value="1962">1962</option><option title="1961" value="1961">1961</option><option title="1960" value="1960">1960</option><option title="1959" value="1959">1959</option><option title="1958" value="1958">1958</option><option title="1957" value="1957">1957</option><option title="1956" value="1956">1956</option><option title="1955" value="1955">1955</option><option title="1954" value="1954">1954</option><option title="1953" value="1953">1953</option><option title="1952" value="1952">1952</option><option title="1951" value="1951">1951</option><option title="1950" value="1950">1950</option><option title="1949" value="1949">1949</option><option title="1948" value="1948">1948</option><option title="1947" value="1947">1947</option><option title="1946" value="1946">1946</option><option title="1945" value="1945">1945</option><option title="1944" value="1944">1944</option><option title="1943" value="1943">1943</option><option title="1942" value="1942">1942</option><option title="1941" value="1941">1941</option><option title="1940" value="1940">1940</option><option title="1939" value="1939">1939</option><option title="1938" value="1938">1938</option><option title="1937" value="1937">1937</option><option title="1936" value="1936">1936</option><option title="1935" value="1935">1935</option><option title="1934" value="1934">1934</option><option title="1933" value="1933">1933</option><option title="1932" value="1932">1932</option><option title="1931" value="1931">1931</option><option title="1930" value="1930">1930</option><option title="1929" value="1929">1929</option><option title="1928" value="1928">1928</option><option title="1927" value="1927">1927</option><option title="1926" value="1926">1926</option><option title="1925" value="1925">1925</option><option title="1924" value="1924">1924</option><option title="1923" value="1923">1923</option><option title="1922" value="1922">1922</option><option title="1921" value="1921">1921</option><option title="1920" value="1920">1920</option><option title="1919" value="1919">1919</option></select>
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                    {!isValid && (
                                                                        <div className="overflow-visible mt-[4px] mb-[8px] bg-transparent flex flex-col items-stretch self-auto justify-start relative" style={{ color: 'rgb(0, 0, 0, 1)' }}>
                                                                            <p className="text-center block font-normal text-[10.5px] leading-[16px] mx-0 mt-[-2px] mb-[-3px] text-[#737373] dark:text-[#A8A8A8]">
                                                                                Es necesario que indiques tu fecha de nacimiento
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="overflow-visible bg-transparent flex flex-col items-stretch justify-start relative grow-0 ">
                                                                <div className="my-[8px] overflow-visible mb-[8px] bg-transparent flex flex-col items-stretch justify-start relative grow-0">
                                                                    <span className="text-center block font-normal text-[10.5px] leading-[16px] relative overflow-visible wrap-break-word  text-[#737373] dark:text-[#A8A8A8]">
                                                                        Indica tu fecha de nacimiento, aunque esta cuenta sea para una empresa, una mascota, etc.
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {msg && (
                                                                <div className="text-center my-2 text-red-600">{msg}</div>
                                                            )}
                                                            <div className="py-[16px] px-[8px] w-[100%] overflow-visible flex flex-col items-stretch relative justify-start">
                                                                <button onClick={handleGoBirthday} className={`btnEntrar ${isValid ? 'opacity cursor-pointer btnLoginhover' : 'opacity-[.7]'}`} disabled={!isValid}>
                                                                    {loading ? "Cargando..." : "Siguiente"}
                                                                </button>
                                                            </div>
                                                            <div className="overflow-visible mb-[8px] bg-transparent flex flex-col items-stretch self-auto justify-start relative grow-0 ">
                                                                <button onClick={() => navigate('/register')} className="border-0 m-0 inline-block btnAtras  text-[#4150F7] dark:text-[#708DFF] p-0 relative text-center appearance-none bg-none cursor-pointer text-sm font-medium pointer-events-auto w-auto leading-[18px]">
                                                                    Atrás
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" py-[10px] flex-col flex items-center relative align-baseline border-[1px] border-[#DBDBDB] dark:border-[#dbdbdb42]">
                                                    <p className="m-[15px] text-black dark:text-white text-center text-sm ">
                                                        ¿Tienes una cuenta?
                                                        <a onClick={() => navigate('/login')} className="no-underline inline bg-transparent touch-manipulation cursor-pointer text-[#4150f7] outline-none">
                                                            <span className="overflow-visible min-w-0 max-w-[100%] text-sm wrap-break-word  text-[#4150F7] dark:text-[#708DFF] font-semibold relative block whitespace-pre-line ">
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

export default Birthday
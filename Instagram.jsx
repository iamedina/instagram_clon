import Footer from "./src/components/inicio/Footer";
import ShowLogo from "./src/components/inicio/ShowLogo";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Instagram() {
  const [showSplash, setShowSplash] = useState(true);

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

  return (
    <div>
      {/* Esto es el logo del principio de instagram */}
      {showSplash && <ShowLogo className={`transition-opacity duration-700 ${showSplash ? 'opacity-100' : 'opacity-0'}`} />}
      {!showSplash && (
        <div className="relative z-0 ">
          <div className="flex-col flex relative z-0 ">
            <div className="flex flex-col relative top-0 min-h-screen">
              <div className="mb-[-100vh] flex flex-col relative z-0">
                <div className="overflow-visible h-[100%] bg-white flex static justify-between items-stretch flex-row self-auto grow-0 text-[0, 0, 0, 1] text-sm leading-[18px]">
                  <div className="w-[100%]">
                    <section className="min-h-screen flex-col flex">
                      <main className=" bg-white dark:bg-black dark:text-white justify-center flex-col flex grow">
                        <div className="mb-[44px] overflow-hidden flex justify-center bg-transparent items-center flex-row self-auto relative grow ">
                          <div className="w-[100%] max-w-[350px] mt-[12px] justify-center flex-col flex text-[rgb(0, 0, 0, 1)] grow">
                           bienvenido a instagram 
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
      )}
    </div>
  )
}

export default Instagram

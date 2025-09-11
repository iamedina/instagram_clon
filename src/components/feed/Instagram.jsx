import Footer from "../inicio/Footer";
import ShowLogo from "../inicio/ShowLogo";
import ArticleView from "./Article";
import Aside from "./BarraLateral";
import HeaderNav from "./header";
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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Esto es el logo del principio de instagram */}
      {showSplash && <ShowLogo className={`transition-opacity duration-700 ${showSplash ? 'opacity-100' : 'opacity-0'}`} />}
      {!showSplash && (
        <div className="relative z-0 overflow-x-hidden">
          <div className="flex-col flex h-screen relative z-0 ">
            <div className="flex flex-col relative top-0 ">
              <div className="mb-[-100vh] flex flex-col relative z-0">
                <div className=" bg-white flex static justify-between items-stretch h-screen flex-row self-auto grow-0 text-[0, 0, 0, 1] text-sm leading-[18px]">
                  <div className="w-[84%] max-md:w-full ml-auto nav-range">
                    <section className=" flex-col flex-1 overflow-y-auto">
                      <HeaderNav />
                      <main className=" bg-white dark:bg-black dark:text-white justify-center flex-col flex grow overflow-y-auto min-h-0">
                        <div className="w-[100%] flex justify-center items-stretch flex-row text-[#000000] dark:text-[#ffffff] text-sm leading-[18px] ">
                          <div className="w-[100%] max-w-[630px] mt-[12px] justify-center flex-col flex text-[rgb(0, 0, 0, 1)] grow ">
                           <div className="mt-[16px]">
                              <div className="mb-[24px]">
                                <div data-pagelet="story_tray"></div>
                              </div>
                              <div className=" bg-transparent flex flex-col justify-start items-center static self-auto [@media(max-width:1160px)]:items-center">
                                <div className=" max-w-[100%] w-[min(470px, 100vw)] bg-transparent flex-col flex static items-stretch self-auto justify-start grow-0">
                                  <div>
                                    <div className="flex flex-col pb-[8866.88px] relative text-[#000000] dark:text-[#ffffff] text-sm leading-[18px]">
                                      <ArticleView className="flex justify-center items-center "/>
                                      <ArticleView className="flex justify-center items-center "/>
                                    </div>
                                  </div>
                                  <div className=" h-[48px] mt-[40px] hidden flex-col items-stretch relative align-baseline">
                                    <div className="w-[32px] h-[32px] top-[50%] left-[50%] justify-center flex-col flex translate-[(-50%, -50%)] absolute">
                                      <svg aria-label="Cargando..." class="xemfg65 xa4qsjk x1ka1v4i xbv57ra" role="img" viewBox="0 0 100 100"><rect class="x1i210e2" height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect><rect class="x1i210e2" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect></svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                           </div>
                          </div>

                          <div className="w-[319px] pl-[64px] flex flex-col overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent [@media(max-width:1160px)]:hidden">
                           
                          </div>
                        </div>
                        <div>
                          <div>
                            <div></div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div></div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <div></div>
                          </div>
                        </div>
                      </main>
                    </section>
                  </div>
                <Aside className=" overflow-visible fixed top-0"/>
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

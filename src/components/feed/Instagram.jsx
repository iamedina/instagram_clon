import ShowLogo from "../inicio/ShowLogo";
import Aside from "./BarraLateral";
import ModalFile from "./ModalFile";
import Perfil from "./Perfil";
import Publicaciones from "./Publicaciones";
import HeaderNav from "./header";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Instagram() {
  const [showSplash, setShowSplash] = useState(true);
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("home");

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

  useEffect(() => {
    localStorage.setItem("upload_feed_posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <div>
      {/* Esto es el logo del principio de instagram */}
      {showSplash && <ShowLogo className={`transition-opacity duration-700 ${showSplash ? 'opacity-100' : 'opacity-0'}`} />}
      {!showSplash && (
        <div>
          <HeaderNav />
          {view === "home" && <Publicaciones posts={posts} setPosts={setPosts} />}
          {view === "perfil" && <Perfil />}
          <Aside className=" overflow-visible fixed top-0" posts={posts} setPosts={setPosts} setView={setView} />
        </div>
      )}
    </div>
  )
}

export default Instagram

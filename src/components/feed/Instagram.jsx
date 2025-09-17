import ShowLogo from "../inicio/ShowLogo";
import Aside from "./BarraLateral";
import ModalFile from "./ModalFile";
import Perfil from "./Perfil";
import Publicaciones from "./Publicaciones";
import HeaderNav from "./Header";
import { supabase } from "../../supabaseClient";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Instagram() {
  const [showSplash, setShowSplash] = useState(true);
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("home");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const localToken = localStorage.getItem("token");
      const { data: { session } } = await supabase.auth.getSession();
      const fbToken = session?.access_token;

      // Validar tu token propio
      let isLocalTokenValid = false;
      if (localToken) {
        try {
          const payload = JSON.parse(atob(localToken));
          const now = Math.floor(Date.now() / 1000);
          if (payload.exp > now) isLocalTokenValid = true;
        } catch {
          localStorage.removeItem("token");
        }
      }

      // Si alguno es válido, navegar a /home
      if (isLocalTokenValid || fbToken) {
        navigate("/home", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

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
          {view === "home" && <Publicaciones posts={posts} setPosts={setPosts} setSelectedUserId={setSelectedUserId} setView={setView}/>}
          {view === "perfil" && <Perfil userId={selectedUserId}/>}
          <Aside className=" overflow-visible fixed top-0" view={view} setPosts={setPosts} setView={setView} />
        </div>
      )}
    </div>
  )
}

export default Instagram

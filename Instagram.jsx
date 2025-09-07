import Footer from "./src/components/inicio/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Instagram() {

    const navigate = useNavigate();

     useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

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
  }, []);

    return (
        <div>
            Inicio de Instagram
        </div>
    );
}

export default Instagram;
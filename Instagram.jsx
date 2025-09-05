import Footer from "./src/components/inicio/Footer";
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Instagram(){

    if (!localStorage.getItem("auth")) {
    return <Navigate to="/" replace />;
}

    return(
        <div>
            Inicio de Instagram
        </div>
    );
}

export default Instagram;
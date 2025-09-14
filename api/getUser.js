// archivo: /api/getUser.js
import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        // Obtener token del header enviado desde React
        const authHeader = req.headers.authorization || "";
        const token = authHeader.replace("Bearer ", "").trim();

        if (!token) {
            return res.status(401).json({ success: false, message: "Token no proporcionado" });
        }

        // Llamar al PHP en tu hosting InfinityFree
        const url = `https://instagramclon.free.nf/getUser.php`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        // Devolver la respuesta al frontend
        res.status(200).json(data);
    } catch (err) {
        console.error("Error en proxy getUser:", err);
        res.status(500).json({ success: false, message: "Error interno del proxy" });
    }
}

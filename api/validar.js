// archivo: /api/validar.js
import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        // Obtener el query string del frontend
        const { username } = req.query;

        if (!username) {
            return res.status(400).json({ success: false, message: "No se proporcionó username" });
        }

        // Llamar al PHP en tu hosting InfinityFree
        const url = `https://instagramclon.free.nf/validar.php?username=${encodeURIComponent(username)}`;
        const response = await fetch(url);
        const data = await response.json();

        // Devolver la respuesta tal cual al frontend
        res.status(200).json(data);
    } catch (err) {
        console.error("Error en proxy validar:", err);
        res.status(500).json({ success: false, message: "Error interno del proxy" });
    }
}

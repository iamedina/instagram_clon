// archivo: /api/getPosts.js
import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        const page = req.query.page || 1;

        // Llamar al PHP en InfinityFree
        const url = `https://instagramclon.free.nf/getPosts.php?page=${page}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        res.status(200).json(data);
    } catch (err) {
        console.error("Error en proxy getPosts:", err);
        res.status(500).json({ success: false, message: "Error interno del proxy" });
    }
}

import fetch from "node-fetch";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const response = await fetch("https://instagramclon.free.nf/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req.body),
            });
            const data = await response.json();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ success: false, message: "Error de red", error: err.message });
        }
    } else {
        res.status(405).json({ success: false, message: "Método no permitido" });
    }
}
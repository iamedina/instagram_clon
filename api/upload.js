import FormData from "form-data";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false, // Para manejar FormData
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Método no permitido" });
    return;
  }

  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ success: false, error: "No autorizado" });
      return;
    }

    const form = new FormData();
    req.body.forEach((file) => {
      form.append("files[]", file);
    });

    const response = await fetch("https://instagramclon.free.nf/upload.php", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: req.body, // Enviar FormData
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error proxy upload:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

import fetch from "node-fetch";

export default async function handler(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const url = `https://instagramclon.free.nf/getPosts.php?page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error proxy getPosts:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
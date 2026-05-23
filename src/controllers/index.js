import pool from "../DB/index.js";

export const insertUrl = async (req, res) => {
  const { long_url, short_url } = req.body;
  if (!long_url) {
    return res.status(400).json({ error: "Long url is required" });
  }
  const result = await pool.query(
    `INSERT INTO clicked_links (long_url, short_url) VALUES ($1, $2)`,[long_url, short_url]
  );
  if(result?.rowCount === 1){
    return res.status(200).json({ message: "Successfully inserted"});
  } else {
    return res.status(500).json({ error: "DB insertion error---"});
  }
};

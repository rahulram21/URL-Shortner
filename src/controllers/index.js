import pool from "../DB/index.js";
import { encodeToShortUrl } from "./encodeUrl.js";

export const insertUrl = async (req, res) => {
  const { long_url } = req.body;
  if (!long_url) {
    return res.status(400).json({ error: "Long url is required" });
  };
  const shortLink = encodeToShortUrl(long_url);
  if(!shortLink){
    return res.status(500).json({ error: 'Something is wrong with encoding'});
  }
  const result = await pool.query(
    `INSERT INTO clicked_links (long_url, short_url) VALUES ($1, $2)`,[long_url, shortLink]
  );
  if(result?.rowCount === 1){
    return res.status(200).json({ message: "Successfully inserted", shortLink: `http://localhost:5000/links/get-long-link?value=${shortLink}` });
  } else {
    return res.status(500).json({ error: "DB insertion error---"});
  }
};

export const getLongUrl = async (req, res) => {
  const shortUrl = req.query.value;
  if(!shortUrl){
    return res.status(400).json({ error:"Please enter valid short url"});
  }
  const longUrl = await pool.query(
    `SELECT long_url FROM clicked_links WHERE short_url=$1`,[shortUrl]
  );

  if(longUrl.rowCount === 1){
    return res.redirect(302, longUrl?.rows[0]?.long_url);
  } else {
    return res.status(500).json({ error: "DB fetching error---"});
  }

}
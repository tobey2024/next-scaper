// pages/api/scrape.js

import axios from 'axios';
import cheerio from 'cheerio';

export default async (req, res) => {
  const { url } = req.query;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const title = $('title').text();

    res.status(200).json({ title });
  } catch (error) {
    console.error('Error scraping page:', error);
    res.status(500).json({ error: 'An error occurred while scraping the page.' });
  }
};


import * as cheerio from 'cheerio';

async function test() {
  try {
    const res = await fetch('https://www.steamgriddb.com/search/grids?term=pubg', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    console.log("Status:", res.status);
    const html = await res.text();
    const $ = cheerio.load(html);
    // Find the first image grid
    const img = $('img.thumb-image').first().attr('src');
    console.log("Found image:", img);
  } catch (e) {
    console.error(e);
  }
}

test();

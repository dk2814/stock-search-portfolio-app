// pages/api/quote.js
import axios from 'axios';

export default async function handler(req, res) {
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({ message: 'Missing stock ticker parameter' });
  }

  try {
    const response = await axios.get('https://finnhub.io/api/v1/quote', {
      params: {
        symbol: ticker,
        token: 'cn7kdkhr01qgjtj4mof0cn7kdkhr01qgjtj4mofg',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}
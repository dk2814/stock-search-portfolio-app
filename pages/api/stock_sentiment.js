// pages/api/insiderSentiment.js
import axios from 'axios';

export default async function handler(req, res) {
  const { ticker, from, to } = req.query;

  if (!ticker) {
    return res.status(400).json({ message: 'Missing stock ticker parameter' });
  }

  try {
    const response = await axios.get('https://finnhub.io/api/v1/stock/insider-sentiment', {
      params: {
        symbol: ticker,
        from,
        to,
        token: process.env.FINNHUB_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting data' });
  }
}
import axios from 'axios';
const { NextApiRequest, NextApiResponse } = require('next');

export default async function handler(req, res) {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: 'Missing stock ticker parameter' });
  }

  try {
    const response = await axios.get('https://finnhub.io/api/v1/search', {
      params: {
        q: query,
        token: process.env.FINNHUB_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error accessing data' });
  }
}

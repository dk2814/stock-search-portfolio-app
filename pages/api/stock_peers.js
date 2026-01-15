import axios from 'axios';

export default async function handler(req, res) {
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({ message: 'Missing stock ticker parameter' });
  }

  try {
    const response = await axios.get('https://finnhub.io/api/v1/stock/peers', {
      params: {
        symbol: ticker,
        token: process.env.FINNHUB_API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}

// const fetchPeersData = async (ticker) => {
//   try {
//     const response = await axios.get('https://finnhub.io/api/v1/stock/peers', {
//       params: {
//         symbol: ticker,
//         token: 'YOUR_FINNHUB_TOKEN',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching peers data:', error);
//     throw error;
//   }
// };

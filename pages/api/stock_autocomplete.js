import axios from 'axios';

export default async function handler(req, res) {
  const { query, token } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is missing' });
  }

  try {
    const response = await axios.get('https://finnhub.io/api/v1/search', {
      params: {
        q: query,
        token: 'cn7kdkhr01qgjtj4mof0cn7kdkhr01qgjtj4mofg',
      },
    });

    const { count, result } = response.data;

    // Extracting necessary data from result array
    const autocompleteData = result.map(item => ({
      description: item.description,
      displaySymbol: item.displaySymbol,
      symbol: item.symbol,
      type: item.type,
    }));

    res.status(200).json({ count, autocompleteData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching autocomplete data from Finnhub' });
  }
}

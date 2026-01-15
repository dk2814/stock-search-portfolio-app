const fetchHistoricalData = async (ticker) => {
    try {
      const response = await axios.get('https://finnhub.io/api/v1/stock/candle', {
        params: {
          symbol: ticker,
          resolution: 60, // 60 minutes (hourly data)
          from: Math.floor(Date.now() / 1000) - 86400, // 24 hours ago (Unix timestamp)
          to: Math.floor(Date.now() / 1000), // Current time (Unix timestamp)
          token: 'cn7kdkhr01qgjtj4mof0cn7kdkhr01qgjtj4mofg',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  };
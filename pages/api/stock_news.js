const fetchNewsData = async (ticker) => {
    try {
      const response = await axios.get('https://finnhub.io/api/v1/company-news', {
        params: {
          symbol: ticker,
          token: 'YOUR_FINNHUB_TOKEN',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching news data:', error);
      throw error;
    }
  };
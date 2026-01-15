import Head from "next/head";
import axios from "axios";
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/styles.module.css'; // Import path
import { FaStar } from 'react-icons/fa'; // Assuming you're using react-icons
import NavigationBar from '../components/navbar';



interface CompanyProfile {
  // country: string;
  // currency: string;
  exchange: string;
  name: string;
  ticker: string;
  // ipo: string;
  // marketCapitalization: number;
  // shareOutstanding: number;
  logo: string;
  // phone: string;
  // weburl: string;
  // finnhubIndustry: string;
}

interface StockQuote {
  c: number; // current price
  d: number; // change in price
  dp: number; // percentage change in price
  h: number; // high price
  t: number; // Timestamp of last stock data
  l: number; // low price
  o: number; // open price
  pc: number; // previous close price 
}

function Homepage() {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [stockQuote, setStockQuote] = useState<StockQuote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [error, setError] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // State to control the visibility of the navigation menu
  const [emptySearch, setEmptySearch] = useState(false); // State to track empty search
  const [marketIsOpen, setMarketIsOpen] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [isBought, setIsBought] = useState(false); // State to track "Buy" button click
  const [data, setData] = useState(null); // Initialize data state
  const [isLoading, setIsLoading] = useState(false); // Optional: Track loading state


  const starIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="none" // Set fill to none to create an empty shape
        stroke="black" // Set stroke for black border
        stroke-width="2" // Adjust stroke-width for desired border thickness
        stroke-linecap="round" // Add rounded corners to border
        stroke-linejoin="round" // Smooth connection between border segments
        d="M12 8l5 4-5 4-4-4 5-4z" // Path for the star shape
      />
    </svg>
  );
  

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setEmptySearch(true); // Set empty search state to true
      return; // Return early if search term is empty
    }
    setSearchClicked(true);
  };

  const handleClear = () => {
    setSearchTerm('');
    setCompanyProfile(null);
    setStockQuote(null);
    setError(false);
    setEmptySearch(false); // Reset empty search state
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setEmptySearch(false); // Reset empty search state when input changes
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchTerm.trim() === '') {
        setEmptySearch(true); // Set empty search state to true
        return; // Return early if search term is empty
      }
      setSearchClicked(true);
    }
  };

  const toggleNavMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [previousMarketCloseTime, setPreviousMarketCloseTime] = useState<string>('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkMarketStatus = () => {
    const currentTime = new Date().getTime();
    
    if (stockQuote && stockQuote.t) {
      const stockTimestamp = stockQuote.t * 1000; // Convert stock timestamp to milliseconds
      const timeDifference = currentTime - stockTimestamp;
      const marketIsOpenValue = timeDifference <= (5 * 60 * 1000); // 5 minutes in milliseconds
  
      setMarketIsOpen(marketIsOpenValue);
      setPreviousMarketCloseTime(marketIsOpenValue ? '' : new Date(stockTimestamp).toLocaleString());
    } else {
      setMarketIsOpen(false); // No data, assume closed
      setPreviousMarketCloseTime('');
    }
  };

  const [activeTab, setActiveTab] = useState<string>('summary');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  
  
  
  // Function to convert timestamp to your local timezone (if necessary)
// Function to convert timestamp to your local timezone (if necessary)
function convertTimeToLocal(timestamp: number): number {
  const offset = new Date().getTimezoneOffset() * 60 * 1000; // Get the timezone offset in milliseconds
  return timestamp - offset; // Subtract the offset from the timestamp
}

  
useEffect(() => {
  let timerId: NodeJS.Timeout; // Declare timerId as NodeJS.Timeout

  const fetchData = async () => {
    try {
      const [stockDataResponse, stockQuotesResponse] = await Promise.all([
        axios.get(`/api/stock_data?ticker=${searchTerm}`),
        axios.get(`/api/stock_quotes?ticker=${searchTerm}`)
      ]);

      // Handling stock data response
      if (Object.keys(stockDataResponse.data).length === 0 || !stockDataResponse.data.ticker) {
        console.log("Empty or invalid data received (stock_data).");
        setError(true);
        setCompanyProfile(null); // Reset companyProfile on invalid data
      } else {
        console.log("Valid data received (stock_data).");
        setCompanyProfile(stockDataResponse.data);
        setError(false);
      }

      // Handling stock quotes response
      if (Object.keys(stockQuotesResponse.data).length === 0 || !stockQuotesResponse.data.c) {
        console.log("Empty or invalid data received (quote).");
        setError(true);
        setStockQuote(null); // Reset stockQuote on invalid data
      } else {
        console.log("Valid data received (quote).");
        setStockQuote(stockQuotesResponse.data);
        checkMarketStatus(); // Update market status after receiving stock quote data
        setError(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
      setCompanyProfile(null);
      setStockQuote(null);
    } finally {
      setSearchClicked(false);
    }
  };

  const fetchAndUpdateData = () => {
    if (marketIsOpen) {
      fetchData();
    }
  };

  // Fetch data initially
  if (searchClicked && searchTerm) {
    fetchData();
  }

  // Start the timer to fetch data every 5 seconds when the market is open
  if (marketIsOpen) {
    timerId = setInterval(fetchAndUpdateData, 5000); // Refresh every 5 seconds
  }

  // Clear the timer when the component unmounts or when the market is closed
  return () => {
    if (timerId) { // Check for timerId before clearing
      clearInterval(timerId);
    }
  };
}, [checkMarketStatus, marketIsOpen, searchClicked, searchTerm]);

  
  

  return (
    <div>
      <Head>
        <meta charSet="UTF-8"/>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: "#00008b" }}>
        <div className="container-fluid">
          <a className="navbar-brand ms-2 text-white" href="#">Stock Search</a>
          <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNavMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"collapse navbar-collapse" + (isNavOpen ? " show" : "")} id="navbarSupportedContent">
            <div className="navbar-nav ms-auto mb-2 mb-lg-0"> {/* Shifting the items to the right */}
              <button className="btn btn-link text-white nav-link active">Search</button>
              <button className="btn btn-link text-white nav-link">Watchlist</button>
              <button className="btn btn-link text-white nav-link">Portfolio</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="text-center mt-7 mb-4" style={{ marginTop: "13vh" }}>
        <h2 className="h2">STOCK SEARCH</h2>
      </div>


      <div className="container">
  <div className={`input-group mb-3 rounded-pill ${styles.searchBar}`}>
    <input
      type="text"
      className={`form-control rounded-pill ${styles.searchInput}`}
      placeholder="Enter Stock Ticker Symbol"
      aria-label="Search"
      aria-describedby="searchIcon"
      value={searchTerm}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
    <div className={`input-group-append ${styles.searchIcons}`}>
      <span
        className={`input-group-text rounded-pill ${styles.iconContainer}`}
      >
        <i className="fa fa-search" onClick={handleSearch}></i>
        <i className="fa fa-times" onClick={handleClear}></i>
      </span>
    </div>
  </div>
  {emptySearch && ( // Conditionally render empty search alert
    <div className="alert alert-danger text-center" role="alert">
      Please enter a valid Ticker.
    </div>
  )}
  {error && (
    <div className="alert alert-danger text-center" role="alert">
      No data found. Please enter a valid Ticker.
    </div>
  )}








</div>
<nav className="navbar fixed-bottom navbar-light bg-light small-navbar">
  <div className="container d-flex justify-content-center align-items-center">
    <p className="navbar-text m-0">Powered By <a href="https://finhub.ai" target="_blank" className="text-primary text-decoration-underline">Finhub.ai</a></p>
  </div>
</nav>
    </div>
    
      
  );
}

export default Homepage;
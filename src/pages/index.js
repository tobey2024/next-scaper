// pages/index.js

import React, { useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [url, setUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [error, setError] = useState('');

  const handleScrape = async () => {
    try {
      if (!url.trim()) {
        setError('Please enter a valid URL.');
        return;
      }
      const response = await axios.get(`/api/scrape?url=${encodeURIComponent(url)}`);
      const { title } = response.data;
      if (!title) {
        setError('No title found on the page.');
        setPageTitle('');
      } else {
        setPageTitle(title);
        setError('');
      }
    } catch (error) {
      console.error('Error scraping page:', error);
      setPageTitle('Error scraping page');
      setError('An error occurred while scraping the page.');
      setPageTitle('');
    }
  };

  return (
    <div className='flex flex-col  p-4'>
      <h1 className='text-[50px] text-slate-500 font-bold hover:text-slate-400 mb-6'>WEBSCRAPER</h1>
      <div className='mb-2 md:mb-4 flex flex-col md:flex-row space-y-2 md:space-x-2'>
        <input
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          className='text-black p-4 text-md rounded-md'
          placeholder='INPUT URL'
        />
        <button 
          onClick={handleScrape}
          className='border p-4 rounded-md shadow-md hover:bg-slate-700 text-lg font-semibold'
        >
          Scrape
        </button>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='flex space-x-4 '>
        <p className='text-lg font-semibold'>Title:</p>
        {pageTitle && <p className='text-purple-600 text-lg font-semibold'>{pageTitle}</p>}
      </div>
      
    </div>
  );
};

export default IndexPage;

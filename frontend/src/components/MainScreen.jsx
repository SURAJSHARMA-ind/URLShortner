import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function MainScreen() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const findShortLink = async () => {
    try {
      const response = await axios.post('http://localhost:3000/short/url', {
        url: url,
      });
      setMessage(response.data.message);
      setShortUrl(response.data.shortUrl);
      setUrl('');
      setLoading(false);
    } catch (error) {
      setMessage('Error shortening URL');
      console.error('Error fetching short URL:', error);
    }
  };

  const urlHandler = (e) => {
    setUrl(e.target.value);
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Copied!');
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-yellow-200 bg-opacity-50 p-4'>
      <div>
        <Toaster />
      </div>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full overflow-hidden max-w-md'>
        <h1 className='text-center text-2xl font-bold mb-6 text-red-500'>Short URL</h1>
        <div className='flex items-center mb-4'>
          <input
            type='text'
            placeholder='Enter URL'
            value={url}
            onChange={urlHandler}
            className='flex-grow h-12 p-2 border border-yellow-400 text-black placeholder-gray-500 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-300'
          />
          <button
            onClick={findShortLink}
            className='bg-red-500 text-white h-12 rounded-r-md px-4 hover:bg-red-600 transition duration-300'
          >
            <ImSearch className='w-5 h-5' />
          </button>
        </div>

        <div className={`${loading ? 'hidden' : ''} bg-yellow-100 p-4 rounded-md overflow-hidden mt-4`}>
          <h2 className='text-lg font-semibold'>Status: <span className='text-red-500'>{message}</span></h2>
          <h2 className='text-lg font-semibold overflow-ellipsis'>
            Short URL: 
            <span
              onClick={copyHandler}
              className='text-blue-600 hover:text-blue-700 bg-yellow-200 p-1 rounded cursor-pointer ml-2'
            >
              {shortUrl}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;

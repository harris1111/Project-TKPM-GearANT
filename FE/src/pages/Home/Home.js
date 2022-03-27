import React from 'react';
import HomeMenu from './HomeMenu/HomeMenu';

export default function Home() {
  return (
    <div className='my-5'>
      <h2 className="container text-3xl text-red-500">
        Upcoming
      </h2>
      <HomeMenu/>
      <h2 className="container text-3xl text-red-500">
        Best seller
      </h2>
      <HomeMenu/>
    </div>
  )
}


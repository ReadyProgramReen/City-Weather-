import React from 'react'
import './Weather.css'


const Weather = () => {
  return (
    <div className='weather'>
        {/* search bar div */}
            <div className="search-bar">
        <input type="text" placeholder='Search Location' />
        <img src="" alt="" />
     </div>

     {/* weather image  */}
     <img src="" alt="" />
    </div>
  )
}

export default Weather
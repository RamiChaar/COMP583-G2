import Amenity from "./Amenity";
import ShowTime from "./ShowTime";

import {useEffect} from 'react'

function AmenityGroup ({amenityGroup}) {


    return (
        <div className='amenityGroup'>
            <div className='amenities'>
              {amenityGroup.amenities.map((amenity) => {
                return <Amenity key={amenity.id} amenity={amenity}/>
              })}
            </div>
            <div className='showTimes'>
              {amenityGroup.showtimes.map((showTime) => {
                return <ShowTime key={showTime.id} showTime={showTime}/>
              })}
            </div>
        </div>
    );

  }
  
  export default AmenityGroup;
import { v4 as uuidv4 } from 'uuid'
import Amenity from "./Amenity";
import ShowTime from "./ShowTime";

function AmenityGroup ({amenityGroup}) {
    return (
        <div className='amenityGroup'>
            <div className='amenities'>
              {amenityGroup.amenities.map((amenity) => {
                return <Amenity key={amenity.id} amenity={amenity}/>
              })}
              {amenityGroup.amenities.length === 0 ? <Amenity key={uuidv4()} amenity={{name: 'No amenities specified', shortDescription: 'No amenities have been specified for this showing.'}}/> : ''}
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
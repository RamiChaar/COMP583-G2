import AmenityGroup from './AmenityGroup'
import { v4 as uuidv4 } from 'uuid'

function ShowTimeVariant ({variant, handleShowtimeClicked}) {
    let name = variant.formatName;

    function handleShowtimeClick(showTime) {
        handleShowtimeClicked(showTime, variant)
    }

    return (
        <div className='variant'>
            <p className='variantName'>{name}</p>
            {variant.amenityGroups.map((amenityGroup) =>{
                return <AmenityGroup key={uuidv4()} amenityGroup={amenityGroup} handleShowtimeClick={handleShowtimeClick}/>
            })}
        </div>
    );

  }
  
  export default ShowTimeVariant;
import AmenityGroup from './AmenityGroup'
import { v4 as uuidv4 } from 'uuid'

function ShowTimeVariant ({variant}) {
    let name = variant.formatName;
        
    return (
        <div className='variant'>
            <p className='variantName'>{name}</p>
            {variant.amenityGroups.map((amenityGroup) =>{
                return <AmenityGroup key={uuidv4()} amenityGroup={amenityGroup} />
            })}
        </div>
    );

  }
  
  export default ShowTimeVariant;
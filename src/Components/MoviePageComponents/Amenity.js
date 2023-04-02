function Amenity ({amenity}) {
    let name = amenity.name;
    let description = amenity.shortDescription;

    const amenityInfoPopUp = () => {
        alert(description);
      }

    return (
        <div className='amenityDiv'>
            <p className='amenity' onClick={amenityInfoPopUp}>
                {name}
            </p>
            <p className='amenityDot'>&#x2022;</p>
        </div>
    );

  }
  
  export default Amenity;
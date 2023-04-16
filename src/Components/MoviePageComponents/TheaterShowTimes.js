import ShowTimeVariant from './ShowTimeVariant';

function TheaterShowTimes ({theaterShowTimes, handleMovieClicked, isNested}) {
    let name = theaterShowTimes.name;
    let distance = Math.ceil(theaterShowTimes.distance * 100) / 100;
    return (
        <div className='theaterShowTimes'>
            <div className="theaterShowTimesHeader">
                <p className='theaterShowTimesTitle'>{theaterShowTimes.distance === undefined ? name : `${name} (${distance}mi)`}</p>
                {isNested ? "" : theaterShowTimes.distance === undefined ?  
                <i className="fa fa-angle-right toMovie" onClick={() => handleMovieClicked(theaterShowTimes.emsVersionId)}></i> : 
                <i className="fa fa-angle-right toMovie" onClick={() => handleMovieClicked(theaterShowTimes.id)}></i>}
            </div>
            {theaterShowTimes.movieVariants.map(variant => {
                return <ShowTimeVariant key={variant.formatId} variant={variant}/>
            })}
        </div>
    );

  }
  
  export default TheaterShowTimes;
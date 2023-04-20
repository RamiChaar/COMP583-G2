import { useEffect } from "react";

function TheaterPreview ({advTheater, handleTheaterClicked}) {

  function theaterClicked() {
      handleTheaterClicked(advTheater?.theaterId)
  }

  return (
    <div className='theaterPreviewContainer' onClick={theaterClicked}>
      {advTheater?.movies == undefined ?
        <h6 className="numOfMovies">{advTheater?.theaterData?.name}</h6> :

        <>
          <div className='theaterTitleDiv'>
            <h6 className="theaterTitle">{advTheater?.theaterData?.name}</h6>
          </div>
          <p className='numOfMovies'>{advTheater?.movies?.length !== 1 ? `${advTheater?.movies?.length} movies playing` : `${advTheater?.movies?.length} movie playing`}</p>
        </>
      }
    </div>
  )
  
}

export default TheaterPreview;

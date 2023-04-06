function TheaterPreview ({advTheater, handleTheaterClicked}) {


    function theaterClicked() {
        handleTheaterClicked(advTheater?.theaterId)
    }

    return (
      <div className='theaterPreviewContainer' onClick={theaterClicked}>
        <div className='theaterTitleDiv'>
          <h6 className="theaterTitle">{advTheater?.theaterData?.name}</h6>
          <p className="distance">{Math.floor(advTheater?.theaterData?.distance*100)/100} mi</p>
        </div>
        <p className='numOfMovies'>{advTheater?.movies?.length !== 1 ? `${advTheater?.movies?.length} movies playing` : `${advTheater?.movies?.length} movie playing`}</p>
      </div>
    )

}

export default TheaterPreview;

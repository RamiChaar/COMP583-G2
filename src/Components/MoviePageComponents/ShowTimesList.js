import TheaterShowTimes from './TheaterShowTimes';

function ShowTimesList ({showTimesList, date, handleMovieClicked, isNested, handleShowtimeClickedInTheater, handleShowtimeClickedInMovie}) {
  return (
    <div className='showTimesList'>
      <p className='showTimesListDate'>{date}</p>
      {showTimesList[0]?.id ?  <p className='showTimesListTitle'>ShowTimes Near You: ({showTimesList.length} Locations)</p> : <p className='showTimesListTitle'></p>}
      
      {showTimesList.length === 0 ? <p>No ShowTimes Available</p>: showTimesList.map( theaterShowTimes => {
          return <TheaterShowTimes key={theaterShowTimes.id === undefined ? theaterShowTimes.emsVersionId : theaterShowTimes.id} 
          theaterShowTimes={theaterShowTimes} handleMovieClicked={handleMovieClicked} handleShowtimeClickedInTheater={handleShowtimeClickedInTheater} handleShowtimeClickedInMovie={handleShowtimeClickedInMovie}isNested={isNested}/>
      })}
    </div>
  );
}

export default ShowTimesList;
import ShowTime from './TheaterShowTimes';

function ShowTimesList ({showTimesList, date}) {
    return (
      <div className='showTimesList'>
        <p className='showTimesListDate'>{date}</p>
        <p className='showTimesListTitle'>ShowTimes Near You: ({showTimesList.length} Locations)</p>
    
        {showTimesList.map( theaterShowTimes => {
            return <ShowTime key={theaterShowTimes.id} theaterShowTimes={theaterShowTimes} />
        })}
      </div>
    );
}

export default ShowTimesList;
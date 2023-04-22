import TheaterPreview from './TheaterPreview';

function TheaterPreviewList ({advTheaters, handleTheaterClicked}) {

    return (
      <>
        {advTheaters?.map(advTheater => {
            return <TheaterPreview key={advTheater?.theaterId} advTheater={advTheater} handleTheaterClicked={handleTheaterClicked}/>
        })}
      </>
    );
}

export default TheaterPreviewList;
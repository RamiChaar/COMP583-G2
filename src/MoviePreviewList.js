import MoviePreview from './MoviePreview';

function MoviePreviewList ({moviePreviews}) {
    return (
      <div className='previewsDiv'>
        {moviePreviews.map(moviePreview => {
            return <MoviePreview key={moviePreview.id} name={moviePreview.name}/>
        })}
      </div>
    );
}

export default MoviePreviewList;
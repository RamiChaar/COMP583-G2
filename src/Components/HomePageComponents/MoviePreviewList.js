import MoviePreview from './MoviePreview';

function MoviePreviewList ({moviePreviews, handleMovieClicked}) {
    return (
      <div className='previewsDiv'>
        {moviePreviews.map(moviePreview => {
            return <MoviePreview key={moviePreview.id} moviePreview={moviePreview} handleMovieClicked={handleMovieClicked}/>
        })}
      </div>
    );
}

export default MoviePreviewList;
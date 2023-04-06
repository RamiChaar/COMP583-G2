import MoviePreview from './MoviePreview';

function MoviePreviewList ({moviePreviews, handleMovieClicked}) {

    return (
      <>
        {moviePreviews?.map(moviePreview => {
          return <MoviePreview key={moviePreview.id} moviePreview={moviePreview} handleMovieClicked={handleMovieClicked}/>
        })}
      </>
    );
}

export default MoviePreviewList;
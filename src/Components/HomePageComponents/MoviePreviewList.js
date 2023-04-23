import MoviePreview from './MoviePreview';

function MoviePreviewList ({moviePreviews, handleMovieClicked, list}) {

    return (
      <>
        {moviePreviews?.map(moviePreview => {
          return <MoviePreview key={moviePreview.id} list={list} moviePreview={moviePreview} handleMovieClicked={handleMovieClicked}/>
        })}
      </>
    );
}

export default MoviePreviewList;
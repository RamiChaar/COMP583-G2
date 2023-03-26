import MoviePreview from './MoviePreview';

function MoviePreviewList ({moviePreviews}) {
    return (
      <div className='previewsDiv'>
        {moviePreviews.map(moviePreview => {
            return <MoviePreview key={moviePreview.id} moviePreview={moviePreview} />
        })}
      </div>
    );
}

export default MoviePreviewList;
import CastMember from './CastMember';

function CastList ({castList}) {

    return (
        <div className='castList'>
            {castList?.map(castMember => {
                return <CastMember key={castMember.id} castMember={castMember}/>
            })}
        </div>
    );
}
  
export default CastList;
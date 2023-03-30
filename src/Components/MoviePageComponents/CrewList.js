import CrewMember from './CrewMember';

function CrewList ({crewList}) {

    return (
        <div className='castList'>
            {crewList?.map(crewMember => {
                return <CrewMember key={crewMember.id} crewMember={crewMember}/>
            })}
        </div>
    );
}
  
export default CrewList;
function CrewMember ({crewMember}) {

    let name = crewMember.name;
    let role = crewMember.role;
    let headShot = crewMember.headShot;
    
    return (
        <div className="crewMember">
            <img className='headShot' src={headShot} alt=""></img>
            <p className ='crewName'>{name}</p>
            <p className ='crewRole'>{role}</p>
        </div>
    );
}
  
export default CrewMember;
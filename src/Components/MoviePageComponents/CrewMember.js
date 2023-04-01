function CrewMember ({crewMember}) {

    let name = crewMember.name;
    let role = crewMember.role;
    let headShot = crewMember.headShot;
    
    return (
        <div className="crewMember">
            {headShot === undefined ?  
            <i className='fa fa-user-circle-o fa-3x'></i> : 
            <img className='headShot' src={headShot} alt=""></img>}
            <p className ='crewName'>{name}</p>
            <p className ='crewRole'>{role}</p>
        </div>
    );
}
  
export default CrewMember;
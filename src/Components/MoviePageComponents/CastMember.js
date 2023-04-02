function CastMember ({castMember}) {

    let name = castMember.name;
    let role = castMember.characterName;
    let headShot = castMember.headShot;
    
    return (
        <div className="castMember">
            <img className='headShot' src={headShot} alt=""></img>
            <p className ='castName'>{name}</p>
            <p className ='castRole'>{role}</p>
        </div>
    );
}
  
export default CastMember;
import {useNavigate, useLocation} from 'react-router-dom';

function FootNote({name, description}) {
    const navigate = useNavigate();
    const location = useLocation();
    let {pathname} = location;
    let state = location.state;

    function handleFootNoteClick() {
        if(pathname !== "/info"){
            navigate("/info", {state: {name: name, description: description, previousPath: pathname, previousState: state}});
        } else {
            navigate("/info", {state: {name: name, description: description, previousPath: state.previousPath, previousState: state.previousState}});
        }
    }

    return(
        <div className='footNote'>
            <p className='footNoteName' onClick={handleFootNoteClick}>
                {name}
            </p>
            <p className='footNoteSeparator'>|</p>
        </div>
    );
}

export default FootNote;
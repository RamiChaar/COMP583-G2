function FootNote({name, description}) {

    function handleFootNoteClick() {
        alert(description)
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
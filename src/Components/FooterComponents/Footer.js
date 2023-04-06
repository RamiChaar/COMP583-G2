import FootNote from './FootNote'
import { v4 as uuidv4 } from 'uuid'

function Footer() {

    let footNotes = []

    footNotes.push({name: 'About Cinema Scouter', description: 'some description'})
    footNotes.push({name: 'Accessibility', description: 'some description'})
    
    // footNotes.push({name: '', description: ''})


    return(
        <div className='footer'>
            <div className='footNotes'>
                {footNotes.map(footNote => {
                    return <FootNote key={uuidv4()} name={footNote.name} description={footNote.description}/>
                })}
            </div>
            <p className='rights'>© 2023 Cinema Scouter</p>
        </div>
    );
}

export default Footer;

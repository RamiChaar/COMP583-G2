import FootNote from './FootNote'
import footNotes from '../../Resources/footNotes.json'
import { v4 as uuidv4 } from 'uuid'

function Footer() {
    return(
        <div className='footer'>
            <div className='footNotes'>
                {footNotes.map(footNote => {
                    if( footNote.name === "" || footNote.description === "") {
                        return;
                    }
                    return <FootNote key={uuidv4()} name={footNote.name} description={footNote.description}/>
                })}
            </div>
            <p className='rights'>© 2023 Cinema Scouter</p>
        </div>
    );
}

export default Footer;

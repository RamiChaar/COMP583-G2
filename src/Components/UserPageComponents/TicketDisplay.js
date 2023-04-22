import Amenity from "../MoviePageComponents/Amenity";
import SeatDisplay from "./SeatDisplay";
import {v4 as uuidv4} from 'uuid'

function TicketDisplay ({ticket, handleCloseTicket})  {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[parseInt(ticket?.showingDate?.substring(5, 7)) - 1];
    const formattedDate = `${month} ${ticket?.showingDate.substring(8, 12)}, ${ticket.showingDate.substring(0, 4)}`;

    const hours = Math.floor(ticket.duration / 60);
    const minutes = ticket.duration%60

    return(
        <div className="overlay">
            <div className='ticketDisplay'>
                <div className='ticketDisplayHeader'>
                    <i className='closePopup fa fa-times' onClick={handleCloseTicket}></i>
                    <p className='ticketDisplayTitle'><b>{ticket.movieName} ({hours === 0? "" : hours+"h"} {minutes+"min"})</b></p>
                </div>
                <div className="ticketDisplayBody">
                    <p className='ticketDisplayMovieDate'>{formattedDate}<b className="ticketDisplayTime">{ticket.time12}</b></p>
                    <p className='ticketDisplayTheaterName'><b>{ticket.theaterName}</b></p>
                    <p className='ticketDisplayAddress'>{ticket.address}</p>
                    <p className='ticketDisplayFormat'>{ticket.formatName}</p>
                    <div className='ticketDisplayAmenities'>
                        {ticket.amenities.map((amenity) => {
                        return <Amenity key={amenity.id} amenity={amenity}/>
                        })}
                        {ticket.amenities.length === 0 ? <Amenity key={uuidv4()} amenity={{name: 'No amenities specified', shortDescription: 'No amenities have been specified for this showing.'}}/> : ''}
                    </div>
                    <p className='ticketDisplaySeats'><b>{ticket.seats.length} {ticket.seats.length === 1 ? "Seat:":"Seats:"} </b>{ticket.seats.join(', ')}</p>
                    
                    <SeatDisplay seats={ticket.seats}/>
                    <p className='ticketDisplayTotalPrice'>${ticket.totalPrice}</p>
                </div>
            </div>
        </div>
    );
}

export default TicketDisplay
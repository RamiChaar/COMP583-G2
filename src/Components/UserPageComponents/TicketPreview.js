
function TicketPreview ({ticket, prevDate, handleClickTicket}) {
    const givenTime = new Date(`2023-04-21T${ticket.showingTime}`);
    const hours = givenTime.getHours()
    const minutes = givenTime.getMinutes();
    const hours12 = (hours % 12) || 12;
    const amOrPm = hours < 12 ? 'am' : 'pm';
    const time12 = `${hours12}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
    ticket.time12 = time12;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[parseInt(ticket?.showingDate?.substring(5, 7)) - 1];
    const formattedDate = `${month} ${ticket?.showingDate.substring(8, 12)}, ${ticket.showingDate.substring(0, 4)}`;
    

    return(
        <>
        {prevDate === ticket.showingDate ? "" : <p className="dateLabel">{formattedDate}</p>}
        <div className="ticketPreview" onClick={() => handleClickTicket(ticket)}>
            <p className="ticketPreviewMovieName">{ticket.movieName}</p>
            <p className="ticketPreviewShowingTime">{time12}</p>
            <p className="ticketPreviewTheaterName">{ticket.theaterName}</p>
            <p className="ticketPreviewSeats">Seats: {ticket.seats.join(", ")}</p>
        </div>
        </>
    );
}

export default TicketPreview
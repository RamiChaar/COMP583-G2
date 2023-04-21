import { useEffect, useState } from "react";
import SeatPicker from "./SeatPicker";
import TicketPicker from "./TicketPicker";
import axios from 'axios';

const LOCAL_STORAGE_KEY_USER_CREDENTIALS = 'cinema-scouter.userCredentials';

function PurchaseTickets ({purchaseTicketInfo, address, handleClosePopup}) {
    const [seatsSelected, setSeatsSelected] = useState(false)
    const [purchasedTickets, setPurchasedTickets] = useState(false)
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        if(purchasedTickets) {
            let windowDiv = document.querySelector('.purchaseTickets')
            windowDiv.style.width = '40vw'
            windowDiv.style.height = '45vh'
            windowDiv.style.marginTop = '25vh'
            windowDiv.style.marginRight = '30vw'
            windowDiv.style.marginLeft = '30vw'
            document.querySelector('.closePopup').style.visibility = 'hidden'
        }

    }, [purchasedTickets])

    function handleConfirmSeats(confirmedSeats) {
        setSeatsSelected(true);
        setSelectedSeats(confirmedSeats)
    }

    function handlePurchaseTickets(adultCount, childCount, seniorCount) {
        addTicketsToDatabase(adultCount, childCount, seniorCount)
        setPurchasedTickets(true)
    }

    async function addTicketsToDatabase(adultCount, childCount, seniorCount) {
        let showTimeObject = {
            showTimeId: purchaseTicketInfo.showTimeId,
            seats: selectedSeats
        }
        await axios.post(`${process.env.REACT_APP_HOST}/showTimeAvailability/add`, showTimeObject)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))

        let storedUserCredentials = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USER_CREDENTIALS));
        if(!storedUserCredentials) {
            return
        }

        let userShowTimeObject = {
            email: storedUserCredentials.email,
            password: storedUserCredentials.password,
            movieId: purchaseTicketInfo.movieId,
            theaterId: purchaseTicketInfo.theaterId,
            movieName: purchaseTicketInfo.movieName,
            theaterName: purchaseTicketInfo.theaterName,
            address: address,
            duration: purchaseTicketInfo.duration,
            showingDate: purchaseTicketInfo.showingDate,
            showingTime: purchaseTicketInfo.showingTime,
            formatName: purchaseTicketInfo.formatName,
            seats: selectedSeats,
            adultCount: adultCount,
            childCount: childCount,
            seniorCount: seniorCount,
            amenities: purchaseTicketInfo.amenities
        }

        await axios.post(`${process.env.REACT_APP_HOST}/users/addTickets`, userShowTimeObject)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))

    }

    return (
        <div className="overlay">
            <div className='purchaseTickets'>
                <div className='purchaseTicketsHeader'>
                    <i className='closePopup fa fa-times' onClick={handleClosePopup}></i>
                    <p className='purchaseTicketsTitle'>{purchaseTicketInfo.movieName}</p>
                </div>

                {seatsSelected ? "": 
                    <SeatPicker purchaseTicketInfo={purchaseTicketInfo} handleConfirmSeats={handleConfirmSeats}/>
                }
                
                {!seatsSelected || purchasedTickets ? "": 
                    <TicketPicker ticketCount={selectedSeats.length} selectedSeats={selectedSeats} handlePurchaseTickets={handlePurchaseTickets}></TicketPicker>
                }

                {!seatsSelected || !purchasedTickets ? "": 
                    <div className="confirmedPurchaseDiv">
                        <p className="confirmedPurchaseLabel">Your purchase has been processed</p>
                        <button className="returnButton" onClick={handleClosePopup}>Okay</button>
                    </div>
                }
            </div>
        </div>
    );

  }
  
  export default PurchaseTickets;
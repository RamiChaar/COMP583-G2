import { useEffect, useState , useRef } from "react";


function TicketPicker ({ticketCount, selectedSeats, handlePurchaseTickets}) {

    const [adultCount, setAdultCount] = useState(0)
    const [childCount, setChildCount] = useState(0)
    const [seniorCount, setSeniorCount] = useState(0)

    const adultPrice = 9.50
    const childPrice = 7.50
    const seniorPrice = 7.50
    const taxRate = .12

    useEffect(() => {
        document.querySelector('.purchaseTicketsButton').addEventListener('mouseover', function() {
            if(document.querySelector('.purchaseTicketsButton') !== null){
                document.querySelector('.purchaseTicketsButton').style.backgroundColor = 'hsl(120, 90%, 15%)'
            }
        });
        document.querySelector('.purchaseTicketsButton').addEventListener('mouseleave', function() {
            if(document.querySelector('.purchaseTicketsButton') !== null){
                document.querySelector('.purchaseTicketsButton').style.backgroundColor = 'hsl(120, 90%, 20%)'
            }
        });
    }, [])

    useEffect(() => {
        let originalColor = 'hsl(120, 90%, 20%)'
        let disabledColor = 'hsl(0, 0%, 25%)'
        document.querySelector('.removeAdult').disabled = false
        document.querySelector('.removeAdult').style.backgroundColor = originalColor
        document.querySelector('.addAdult').disabled = false       
        document.querySelector('.addAdult').style.backgroundColor = originalColor
        document.querySelector('.removeChild').disabled = false
        document.querySelector('.removeChild').style.backgroundColor = originalColor
        document.querySelector('.addChild').disabled = false
        document.querySelector('.addChild').style.backgroundColor = originalColor
        document.querySelector('.removeSenior').disabled = false
        document.querySelector('.removeSenior').style.backgroundColor = originalColor
        document.querySelector('.addSenior').disabled = false
        document.querySelector('.addSenior').style.backgroundColor = originalColor

        if(adultCount === 0) {
            document.querySelector('.removeAdult').disabled = true
            document.querySelector('.removeAdult').style.backgroundColor = disabledColor

        }
        if(childCount === 0) {
            document.querySelector('.removeChild').disabled = true
            document.querySelector('.removeChild').style.backgroundColor = disabledColor

        }
        if(seniorCount === 0) {
            document.querySelector('.removeSenior').disabled = true
            document.querySelector('.removeSenior').style.backgroundColor = disabledColor

        }

        if(adultCount + childCount + seniorCount === ticketCount) {
            document.querySelector('.addAdult').disabled = true
            document.querySelector('.addAdult').style.backgroundColor = disabledColor
            document.querySelector('.addChild').disabled = true
            document.querySelector('.addChild').style.backgroundColor = disabledColor
            document.querySelector('.addSenior').disabled = true
            document.querySelector('.addSenior').style.backgroundColor = disabledColor

            document.querySelector('.purchaseTicketsButton').disabled = false
            document.querySelector('.purchaseTicketsButton').style.backgroundColor = 'hsl(120, 90%, 20%)'
        } else {
            document.querySelector('.purchaseTicketsButton').disabled = true
            document.querySelector('.purchaseTicketsButton').style.backgroundColor = 'hsl(0, 0%, 17.5%)'
        }
    }, [adultCount, childCount, seniorCount])
   
    return (    
        <div className="ticketPicker">
            <div className="ticketPickerHeader">
                <p className="selectTitle">Select {ticketCount} {ticketCount === 1 ? 'Ticket' : 'Tickets'}</p>
                <p className="seatsTitle">{ticketCount === 1 ? 'Seat: ' : 'Seats: '}{selectedSeats.sort().join(', ')}</p>    
            </div>
            <div className='picker adultPicker'>
                <div className="pickerInfoDiv">
                    <p className='typeTitle adultTitle'>Adult</p>
                    <p className='typePrice adultPrice'>${adultPrice.toFixed(2)}</p>
                </div>
                <button className="decrementTicket removeAdult" onClick={() => {setAdultCount(adultCount - 1)}}>-</button>
                <p className="ticketCount adultCount">{adultCount}</p>
                <button className="incrementTicket addAdult" onClick={() => {setAdultCount(adultCount + 1)}}>+</button>
            </div>
            <div className='picker childPicker'>
                <div className="pickerInfoDiv">
                    <p className='typeTitle childTitle'>Child</p>
                    <p className='typePrice childPrice'>${childPrice.toFixed(2)}</p>
                </div>
                <button className="decrementTicket removeChild" onClick={() => {setChildCount(childCount - 1)}}>-</button>
                <p className="ticketCount childCount">{childCount}</p>
                <button className="incrementTicket addChild" onClick={() => {setChildCount(childCount + 1)}}>+</button>
            </div>
            <div className='picker seniorPicker'>
                <div className="pickerInfoDiv">
                    <p className='typeTitle seniorTitle'>Senior</p>
                    <p className='typePrice seniorPrice'>${seniorPrice.toFixed(2)}</p>
                </div>
                <button className="decrementTicket removeSenior" onClick={() => {setSeniorCount(seniorCount - 1)}}>-</button>
                <p className="ticketCount seniorCount">{seniorCount}</p>
                <button className="incrementTicket addSenior" onClick={() => {setSeniorCount(seniorCount + 1)}}>+</button>
            </div>
            <div className="purchaseDiv">
                <div className="priceArea">
                    <p className="subtotalLabel">Subtotal: </p>
                    <p className="subtotal">${(adultCount*adultPrice + childCount*childPrice + seniorCount*seniorPrice).toFixed(2)}</p>
                </div>
                <div className="priceArea taxesArea">
                    <p className="taxesLabel">Taxes and Fees: </p>
                    <p className="totalTaxes">${((adultCount*adultPrice + childCount*childPrice + seniorCount*seniorPrice)*taxRate).toFixed(2)}</p>
                </div>
                <div className="priceArea">
                    <p className="totalLabel">Total: </p>
                    <p className="totalPrice">${((adultCount*adultPrice + childCount*childPrice + seniorCount*seniorPrice)*(1+taxRate)).toFixed(2)} </p>
                </div>
                <button className="purchaseTicketsButton" onClick={() => handlePurchaseTickets(adultCount, childCount, seniorCount)}>Purchase Tickets</button>
            </div>
        </div>
    );

  }
  
  export default TicketPicker;
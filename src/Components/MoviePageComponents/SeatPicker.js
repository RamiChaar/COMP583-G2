import { useEffect, useState , useRef } from "react";
import axios from 'axios';


function SeatPicker ({purchaseTicketInfo, handleConfirmSeats}) {
    const [unavailableSeats, setUnavailableSeats] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatLayout, setSeatLayout] = useState([]);

    const seatRefs = useRef([]);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const newSeatLayout = [11, 13, 14, 14, 14, 14, 14, 14, 14, 14, 15, 17, 18, 18]

    useEffect(() => {
        setSeatLayout(newSeatLayout)
        getUnavailableSeats()

        document.querySelector('.confirmSeats').addEventListener('mouseover', function() {
            if(document.querySelector('.confirmSeats') !== null){
                document.querySelector('.confirmSeats').style.backgroundColor = 'hsl(120, 90%, 15%)'
            }
        });
        document.querySelector('.confirmSeats').addEventListener('mouseleave', function() {
            if(document.querySelector('.confirmSeats') !== null){
                document.querySelector('.confirmSeats').style.backgroundColor = 'hsl(120, 90%, 20%)'
            }
        });

    }, [])

    useEffect(() => {
        if(selectedSeats.length === 0) {
            document.querySelector('.confirmSeats').disabled = true
            document.querySelector('.confirmSeats').style.backgroundColor = 'hsl(0, 0%, 17.5%)'
        } else {
            document.querySelector('.confirmSeats').disabled = false
            document.querySelector('.confirmSeats').style.backgroundColor = 'hsl(120, 90%, 20%)'
        }
    }, [selectedSeats])

    useEffect(() => {
        unavailableSeats.forEach(unavailableSeat => {
            seatRefs.current[unavailableSeat].style.backgroundColor = 'hsl(0, 0%, 40%)'
        })
    }, [unavailableSeats])
    
    async function getUnavailableSeats() {
        await axios.get(`${process.env.REACT_APP_HOST}/showTimeAvailability/${purchaseTicketInfo.showTimeId}`)
        .then(res => {
            if(res.data.takenSeats !== undefined) {
                setUnavailableSeats(res.data.takenSeats)
            }
        })
        .catch(err => console.log(err))
    }

    function handleSelectedSeat(rowNum, colNum) {
        let seat = `${letters[rowNum]}-${colNum + 1}`


        if(unavailableSeats.includes(seat)) {
            return
        }

        document.querySelector('.selectSeatsTitle').style.color="white"

        if(selectedSeats.includes(seat)) {
            let newSelectedSeats = selectedSeats.filter(thisSeat => thisSeat !== seat)
            setSelectedSeats(newSelectedSeats)
            seatRefs.current[`${letters[rowNum]}-${colNum+1}`].style.backgroundColor = 'hsl(208, 75%, 41%)'
        } else {
            if (selectedSeats.length < 10){
                setSelectedSeats([...selectedSeats, seat])
                seatRefs.current[`${letters[rowNum]}-${colNum+1}`].style.backgroundColor = 'hsl(120, 90%, 20%)'
            } else {
                document.querySelector('.selectSeatsTitle').style.color="red"
            }
        }
    }

    function confirmSeats () {
        if(selectedSeats.length == 0) {
            return
        }
        handleConfirmSeats(selectedSeats)
    }

    return (  
        <div>
            <div className="seatPicker">
                <div className="screen">Screen</div>
                <div className="seatMap">
                    {seatLayout.map ( (seatRowLen, i) => (
                        <div className="seatRowDiv" key={i}>
                            <table className="seatRow" key={i}>
                                <tbody>
                                    <tr className="" key={i}>
                                        {Array.from({ length: seatRowLen }, (_, j) => (
                                        <td
                                            key={`${i}${j}`}
                                            className='seat'
                                            ref={(el) => seatRefs.current[`${letters[i]}-${j+1}`] = el}
                                            onClick={() => handleSelectedSeat(i, j)}
                                            >
                                        </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
                <p className="selectSeatsTitle">Select up to 10 seats</p>
            </div>
            <div className='confirmSeatsDiv'>
                <p className="selectedSeats"><b>{selectedSeats.length} Selected:</b> {selectedSeats.sort().join(', ')}</p>
                <button className="confirmSeats" onClick={confirmSeats}>next</button>
            </div>
        </div>  
    );

  }
  
  export default SeatPicker;
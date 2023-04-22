import React, { useEffect, useState , useRef } from "react";

function SeatDisplay ({seats}) {
    const [seatLayout, setSeatLayout] = useState([]);

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const newSeatLayout = [11, 13, 14, 14, 14, 14, 14, 14, 14, 14, 15, 17, 18, 18]
    const seatRefs = useRef([]);

    useEffect(() => {
        setSeatLayout(newSeatLayout)
    }, [])

    useEffect(() => {
        seats.forEach(seat => {
            if(seatRefs.current[seat] !== undefined){
                seatRefs.current[seat].style.backgroundColor = 'hsl(208, 75%, 41%)'
            }
        })
    }, [seatLayout])
    
    return (  
        <div className="seatDisplay">
            <div className="screenSmall">Screen</div>
            <div className="seatMapSmall">
                {seatLayout.map ( (seatRowLen, i) => (
                    <div className="seatRowDivSmall" key={i}>
                        <table className="seatRowSmall" key={i}>
                            <tbody>
                                <tr className="" key={i}>
                                    {Array.from({ length: seatRowLen }, (_, j) => (
                                    <td
                                        key={`${i}${j}`}
                                        className='seatSmall'
                                        ref={(el) => seatRefs.current[`${letters[i]}-${j+1}`] = el}
                                        >
                                    </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );

}
  
  export default SeatDisplay;
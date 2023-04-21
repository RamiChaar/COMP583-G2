import { useState } from "react";

function ShowTime ({showTime, handleShowtimeClick}) {
    let time = showTime.providerTime;
    let isActive = showTime.isActive;
    const [hover, setHover] = useState(false);
    const color = isActive ? 'hsl(120, 90%, 20%)' : 'hsl(0, 0%, 40%)';
    const hoverColor = 'hsl(120, 90%, 15%)'
    
    return (
        <p className='showTime' 
        style={{backgroundColor: (isActive && hover) ? hoverColor : color}}
        onMouseEnter={()=>{
            setHover(true);
        }}
        onMouseLeave={()=>{
            setHover(false);
        }} 
        onClick={() => handleShowtimeClick(showTime)}
        >
            {time.slice(0, -3)}
        </p>
    );

  }
  
  export default ShowTime;
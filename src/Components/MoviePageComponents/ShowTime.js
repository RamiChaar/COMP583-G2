import { useState } from "react";

function ShowTime ({showTime, handleShowtimeClick}) {
    const [hover, setHover] = useState(false);
    let time = showTime.providerTime;
    let isActive = showTime.isActive;

    const givenTime = new Date(`2023-04-21T${time}`);
    const currentTime = new Date();
    givenTime.setFullYear(currentTime.getFullYear());
    givenTime.setMonth(currentTime.getMonth());
    givenTime.setDate(currentTime.getDate());
    currentTime.setFullYear(currentTime.getFullYear());
    currentTime.setMonth(currentTime.getMonth());
    currentTime.setDate(currentTime.getDate());
    const diffInMs = currentTime.getTime() - givenTime.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60); 
    if(diffInHours >= 3) {
        isActive = false
    }

    const hours = givenTime.getHours();
    const minutes = givenTime.getMinutes();
    const hours12 = (hours % 12) || 12;
    const amOrPm = hours < 12 ? 'am' : 'pm';
    const time12 = `${hours12}:${minutes.toString().padStart(2, '0')}${amOrPm}`;

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
        onClick={isActive ? () => handleShowtimeClick(showTime) : ()=>{}}
        >
            {time12}
        </p>
    );

  }
  
  export default ShowTime;
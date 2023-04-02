function ShowTime ({showTime}) {
    let time = showTime.providerTime;
    let isActive = showTime.isActive;
    const color = isActive ? 'hsl(120, 90%, 20%)' : 'hsl(0, 0%, 40%)';

    return (
        <p className='showTime' style={{backgroundColor: color}}>
            {time.slice(0, -3)}
        </p>
    );

  }
  
  export default ShowTime;
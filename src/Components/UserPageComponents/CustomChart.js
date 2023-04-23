import React, { useState, useRef , useEffect} from 'react';
import Chart from "chart.js/auto";

function CustomChart ({dataSets, labels}) {
    const [chartData, setChartData] = useState({labels: [], datasets: []});
    const canvasRef = useRef(null);

    useEffect(() => {
        window.addEventListener('resize', function(e) {
            const chart = Chart.getChart(canvasRef.current);
            if (chart) {
                chart.resize()
            }
        });
    

    }, [])
    useEffect(() => {
        setChartData({datasets: dataSets, labels: labels})
    }, [dataSets, labels]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                scales: {
                x: {
                    ticks: {
                    color: 'white'
                    }
                },
                y: {
                    ticks: {
                    color: 'white'
                    }
                }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });

        return () => chart.destroy();

    }, [chartData]);

    return (
        <div className='chartDiv'>
            <div className='chart'>
                <canvas className='canvas' ref={canvasRef} />
            </div>
        </div>
    )

}

export default CustomChart
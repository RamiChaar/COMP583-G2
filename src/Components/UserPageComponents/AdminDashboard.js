import React, { useState, useRef , useEffect} from 'react';
import CustomChart from "./CustomChart"

function AdminDashboard ({analytics}) {
    const [weekLabels, setWeekLabels] = useState([])
    const [monthLabels, setMonthLabels] = useState([])
    const [allLabels, setAllLabels] = useState([])
    const [genreDataSet, setGenreDataSet] = useState([])
    const [ratingDataSet, setRatingDataSet] = useState([])
    const [listDataSet, setListDataSet] = useState([])
    const [tomatoLevelDataSet, setTomatoLevelDataSet] = useState([])
    const [viewType, setViewType] = useState('week')

    const pastelColors = 
    ['hsl(0, 90%, 75%)', 'hsl(150, 90%, 75%)', 'hsl(90, 90%, 75%)', 'hsl(45, 90%, 75%)',
    'hsl(180, 90%, 75%)', 'hsl(210, 90%, 75%)', 'hsl(120, 90%, 75%)', 'hsl(0, 90%, 75%)',
    'hsl(15, 90%, 75%)', 'hsl(45, 90%, 75%)', 'hsl(165, 90%, 75%)', 'hsl(225, 90%, 75%)',
    'hsl(0, 90%, 75%)', 'hsl(150, 90%, 75%)', 'hsl(45, 90%, 75%)']

    useEffect(() => {
        extractAnalyticsData()
    }, [])

    function extractAnalyticsData() {
        let sortedAnalytics = analytics.sort((a, b) => new Date(a.date) - new Date(b.date));

        let newWeekLabels = []
        let newMonthLabels = []
        let newAllLabels = []

        sortedAnalytics.slice(-7).forEach(analytic => {
            newWeekLabels.push(analytic.date)
        })
        setWeekLabels(newWeekLabels)

        sortedAnalytics.slice(-30).forEach(analytic => {
            newMonthLabels.push(analytic.date)
        })
        setMonthLabels(newMonthLabels)

        sortedAnalytics.forEach(analytic => {
            newAllLabels.push(analytic.date)
        })
        setAllLabels(newAllLabels)

        let newGenreDataSet = []
        let newRatingDataSet = []
        let newListDataSet = []
        let newTomatoLevelDataSet = []
        let newGenreDataPoints = []
        let newRatingDataPoints = []
        let newListDataPoints = []
        let newTomatoLevelDataPoints = []


        sortedAnalytics.forEach((analytic, num) => {
            let newGenreDataPoint = []
            analytic.genreSelectionCounts.sort((a, b) => a.genre.localeCompare(b.genre)).forEach( genreSelectionCount=> {
                newGenreDataPoint.push(genreSelectionCount.count)
            })

            newGenreDataPoint.forEach((genreDataPoint, i) => {
                if (num === 0) {
                    newGenreDataPoints[i] = [genreDataPoint]
                } else {
                    newGenreDataPoints[i]?.push(genreDataPoint)
                }
            })
            
        })
        newGenreDataPoints.forEach((data, i) => {
            newGenreDataSet.push({
                label: sortedAnalytics[0].genreSelectionCounts.sort((a, b) => a.genre.localeCompare(b.genre))[i].genre,
                data,
                borderColor: i===5 ? pastelColors[3]: pastelColors[i],
                borderWidth: 2
            })
        })
        let topFiveGenres = ['Action', 'Adventure', 'Drama', 'Comedy', 'Horror']
        let topFiveGenreDataSet = []

        topFiveGenres.forEach(topGenre => {
            topFiveGenreDataSet.push(newGenreDataSet.find(genreData => genreData.label === topGenre))
        })
        setGenreDataSet(topFiveGenreDataSet)

        sortedAnalytics.forEach((analytic, num) => {
            let newRatingDataPoint = []
            analytic.ratingSelectionCounts.sort((a, b) => a.rating.localeCompare(b.rating)).forEach( ratingSelectionCount=> {
                newRatingDataPoint.push(ratingSelectionCount.count)
            })

            newRatingDataPoint.forEach((ratingDataPoint, i) => {
                if (num === 0) {
                    newRatingDataPoints[i] = [ratingDataPoint]
                } else {
                    newRatingDataPoints[i]?.push(ratingDataPoint)
                }
            })
            
        })
        newRatingDataPoints.forEach((data, i) => {
            newRatingDataSet.push({
                label: sortedAnalytics[0].ratingSelectionCounts.sort((a, b) => a.rating.localeCompare(b.rating))[i].rating,
                data,
                borderColor: pastelColors[i],
                borderWidth: 2
            })
        })
        setRatingDataSet(newRatingDataSet)
        
        sortedAnalytics.forEach((analytic, num) => {
            let newListDataPoint = []
            analytic.listSelectionCounts.sort((a, b) => a.list.localeCompare(b.list)).forEach( listSelectionCount=> {
                newListDataPoint.push(listSelectionCount.count)
            })

            newListDataPoint.forEach((listDataPoint, i) => {
                if (num === 0) {
                    newListDataPoints[i] = [listDataPoint]
                } else {
                    newListDataPoints[i]?.push(listDataPoint)
                }
            })
            
        })
        newListDataPoints.forEach((data, i) => {
            newListDataSet.push({
                label: sortedAnalytics[0].listSelectionCounts.sort((a, b) => a.list.localeCompare(b.list))[i].list,
                data,
                borderColor: pastelColors[i+11],
                borderWidth: 2
            })
        })
        setListDataSet(newListDataSet)

        sortedAnalytics.forEach((analytic, num) => {
            let newTomatoLevelDataPoint = []
            analytic.tomatoLevelCounts.sort((a, b) => a.tomatoLevel.localeCompare(b.tomatoLevel)).forEach( tomatoLevelSelectionCount=> {
                newTomatoLevelDataPoint.push(tomatoLevelSelectionCount.count)
            })

            newTomatoLevelDataPoint.forEach((tomatoLevelDataPoint, i) => {
                if (num === 0) {
                    newTomatoLevelDataPoints[i] = [tomatoLevelDataPoint]
                } else {
                    newTomatoLevelDataPoints[i]?.push(tomatoLevelDataPoint)
                }
            })
            
        })
        newTomatoLevelDataPoints.forEach((data, i) => {
            newTomatoLevelDataSet.push({
                label: sortedAnalytics[0].tomatoLevelCounts.sort((a, b) => a.tomatoLevel.localeCompare(b.tomatoLevel))[i].tomatoLevel,
                data,
                borderColor: pastelColors[10 - i],
                borderWidth: 2
            })
        })
        setTomatoLevelDataSet(newTomatoLevelDataSet)
    }

    function getWeek(dataSet) {
        let newDataSet = dataSet.filter(data => {return true})
        newDataSet.forEach(data => {
            data.data = data.data.slice(-7)
        })
        return newDataSet
    }

    function getMonth(dataSet) {
        let newDataSet = dataSet.filter(data => {return true})
        newDataSet.forEach(data => {
            data.data = data.data.slice(-30)
        })
        return newDataSet
    }


    function handleSwitchToWeek() {
        if(viewType !== 'week') {
            document.querySelector('.weekSwitch').style.backgroundColor = 'hsl(223, 12%, 28%)'
            document.querySelector('.monthSwitch').style.backgroundColor = 'hsl(223, 12%, 12%)'
            document.querySelector('.allSwitch').style.backgroundColor = 'hsl(223, 12%, 12%)'
            setViewType('week')
            extractAnalyticsData()
        }
    }

    function handleSwitchToMonth() {
        if(viewType !== 'month') {
            document.querySelector('.weekSwitch').style.backgroundColor = 'hsl(223, 12%, 12%)'
            document.querySelector('.monthSwitch').style.backgroundColor = 'hsl(223, 12%, 28%)'
            document.querySelector('.allSwitch').style.backgroundColor = 'hsl(223, 12%, 12%)'
            setViewType('month')
            extractAnalyticsData()

        }
    }

    function handleSwitchToAll() {
        if(viewType !== 'all') {
            document.querySelector('.weekSwitch').style.backgroundColor = 'hsl(223, 12%, 12%)'
            document.querySelector('.monthSwitch').style.backgroundColor = 'hsl(223, 12%, 12%)'
            document.querySelector('.allSwitch').style.backgroundColor = 'hsl(223, 12%, 28%)'
            setViewType('all')
            extractAnalyticsData()
        }
    }

    return (
        <div className='adminDashboard'>

            <div className='chartsDiv'>
                <div className='adminHeaderDiv'>
                    <div className="switchChart">
                        <div className="weekSwitch" onClick={handleSwitchToWeek}>Past Week</div>
                        <div className="monthSwitch" onClick={handleSwitchToMonth}>Past Month</div>
                        <div className="allSwitch" onClick={handleSwitchToAll}>All Time</div>
                    </div>
                </div>
                <div className='charts'>
                    {viewType !== 'week' ? "" :
                        <>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Types of Genres Users are Selecting</p>
                                <CustomChart dataSets={getWeek(genreDataSet)} labels={weekLabels}/>   
                            </div>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Age Ratings Users are Selecting</p>
                                <CustomChart dataSets={getWeek(ratingDataSet)} labels={weekLabels}/>
                            </div>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Tomato Score Levels Users are Selecting</p>
                                <CustomChart dataSets={getWeek(tomatoLevelDataSet)} labels={weekLabels}/>
                            </div>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Lists Users are Selecting From</p>
                                <CustomChart dataSets={getWeek(listDataSet)} labels={weekLabels}/>
                            </div>
                        </>
                    }
                    {viewType !== 'month' ? "" :
                        <>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Types of Genres Users are Selecting</p>
                                <CustomChart dataSets={getMonth(genreDataSet)} labels={monthLabels}/>   
                            </div>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Age Ratings Users are Selecting</p>
                                <CustomChart dataSets={getMonth(ratingDataSet)} labels={monthLabels}/>
                            </div>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Tomato Score Levels Users are Selecting</p>
                                <CustomChart dataSets={getMonth(tomatoLevelDataSet)} labels={monthLabels}/>
                            </div>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Lists Users are Selecting From</p>
                                <CustomChart dataSets={getMonth(listDataSet)} labels={monthLabels}/>
                            </div>
                        </>
                    }
                    {viewType !== 'all' ? "" :
                        <>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Types of Genres Users are Selecting</p>
                                <CustomChart dataSets={genreDataSet} labels={allLabels}/>   
                            </div>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Age Ratings Users are Selecting</p>
                                <CustomChart dataSets={ratingDataSet} labels={allLabels}/>
                            </div>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Tomato Score Levels Users are Selecting</p>
                                <CustomChart dataSets={tomatoLevelDataSet} labels={allLabels}/>
                            </div>
                            <div className='chartOuterDiv'>
                                <p className='chartTitle'>Lists Users are Selecting From</p>
                                <CustomChart dataSets={listDataSet} labels={allLabels}/>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
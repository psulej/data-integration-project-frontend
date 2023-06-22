import React, { useState, useEffect } from 'react';
import {Button, Table} from 'react-bootstrap';

const Summary = ({ getAuthorizationHeaders }) => {
    const [summaryData, setSummaryData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        fetchSummaryData();
    }, []);

    const fetchSummaryData = () => {
        fetch(`http://localhost:8080/summary`, {
            method: 'GET',
            headers: { ...getAuthorizationHeaders(), 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                setSummaryData(data);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    };

    const tableStyle = {
        color: 'white',
        width: 'fit-content',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const getUniqueYears = () => {
        const years = summaryData.map((item) => item.yearMonth.substring(0, 4));
        return [...new Set(years)];
    };

    const filteredData = selectedYear ? summaryData.filter((item) => item.yearMonth.startsWith(selectedYear)) : summaryData;

    return (
        <div className="my-2 mx-auto p-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="p-1" style={{ marginBottom: '10px' }}>
                    <label htmlFor="yearSelector"></label>
                    <select id="yearSelector" value={selectedYear} onChange={handleYearChange} className="btn btn-primary btn-sm">
                        <option value="">All</option>
                        {getUniqueYears().map((year) => (
                            <option value={year} key={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <Button variant="primary" size="sm" onClick={() => fetchSummaryData()} style={{ marginLeft: '10px' }}>Refresh data</Button>
                </div>

                <Table bordered style={tableStyle} className="table-fixed">
                    <thead>
                    <tr>
                        <th className="text-center">Date</th>
                        <th className="text-center" style={{backgroundColor: 'lightcyan'}}>Average Temperature</th>
                        <th className="text-center" style={{backgroundColor: 'lightcyan'}}>Average Pressure</th>
                        <th className="text-center" style={{backgroundColor: 'lightcyan'}}>Average Precipitation</th>
                        <th className="text-center" style={{backgroundColor: 'lightcyan'}}>Average Wind Velocity</th>
                        <th className="text-center" style={{backgroundColor: 'lightgrey'}}>Total deaths of man</th>
                        <th className="text-center" style={{backgroundColor: 'lightgrey'}}>Total deaths of woman</th>
                        <th className="text-center" style={{backgroundColor: 'lightgrey'}}>Deaths over 65 years old</th>
                        <th className="text-center" style={{backgroundColor: 'lightgrey'}}>Deaths under 65 years old</th>
                        <th className="text-center" style={{backgroundColor: 'lightgrey'}}>Total deaths</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="10">No data available for the selected year.</td>
                        </tr>
                    ) : (
                        filteredData.map((item) => (
                            <tr key={item.yearMonth}>
                                <td className="text-center">{item.yearMonth}</td>
                                <td className="text-center">{item.averageTemperature.toFixed(2)}°C</td>
                                <td className="text-center">{item.averagePressure.toFixed(2)}[Pa]</td>
                                <td className="text-center">{item.averagePrecipitation.toFixed(2)}</td>
                                <td className="text-center">{item.averageWindVelocity.toFixed(2)}</td>
                                <td className="text-center">{item.manTotalDeaths}</td>
                                <td className="text-center">{item.womanTotalDeaths}</td>
                                <td className="text-center">{item.over65AgeDeaths}</td>
                                <td className="text-center">{item.under65AgeDeath}</td>
                                <td className="text-center">{item.totalDeaths}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Summary;

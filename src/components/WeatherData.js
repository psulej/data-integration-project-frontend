import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const WeatherData = () => {
    const [page, setPage] = useState(0);
    const [weatherData, setWeatherData] = useState([]);
    const [pageSettings, setPageSettings] = useState({});

    useEffect(() => {
        fetchWeatherData();
    }, [page]);

    const fetchWeatherData = () => {
        console.log('page: ', page);
        fetch(`http://localhost:8080/data/weather-data?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setWeatherData(data.content);
                setPageSettings({
                    totalPages: data.totalPages,
                    totalElements: data.totalElements
                });
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

    return (
        <div
            className="my-2 mx-auto p-2"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <PaginationControl
                        page={page}
                        between={6}
                        total={pageSettings.totalElements - 1}
                        limit={20}
                        changePage={(page) => {
                            setPage(page);
                            console.log(page);
                        }}
                        ellipsis={2}
                    />
                </div>
                <Table bordered style={tableStyle} className="table-fixed">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Temperature</th>
                        <th>Pressure</th>
                        <th>Precipitation</th>
                        <th>Wind direction</th>
                        <th>Wind velocity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {weatherData.length === 0 ? (
                        <tr>
                            <td colSpan="7">Loading weather data...</td>
                        </tr>
                    ) : (
                        weatherData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.date}</td>
                                <td>{item.temperature}</td>
                                <td>{item.pressure}</td>
                                <td>{item.precipitation} </td>
                                <td>{item.windDirection}</td>
                                <td>{item.windVelocity}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>

                <div>
                    <PaginationControl
                        page={page}
                        between={6}
                        total={pageSettings.totalElements - 1}
                        limit={20}
                        changePage={(page) => {
                            setPage(page);
                            console.log(page);
                        }}
                        ellipsis={2}
                    />
                </div>
            </div>
        </div>
    );
};

export default WeatherData;

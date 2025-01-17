import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {PaginationControl} from 'react-bootstrap-pagination-control';
import ExportImportWeatherData from "./ExportImportWeatherData";

const WeatherData = (
    {
        getAuthorizationHeaders,
        fetchWeatherData,
        weatherData,
        pageSettings,
        page,
        setPage
    }
) => {

    useEffect(() => {
        fetchWeatherData();
    }, [page]);


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
            <div style={{display: 'flex', flexDirection: 'column'}}>

                <ExportImportWeatherData
                    getAuthorizationHeaders={getAuthorizationHeaders}
                    fetchWeatherData={fetchWeatherData}
                />
                <div>
                    <PaginationControl
                        page={page}
                        between={6}
                        total={pageSettings.totalElements}
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
                            <td colSpan="7">No Data loaded...</td>
                        </tr>
                    ) : (
                        weatherData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{
                                    (() => {
                                        const timestamp = new Date(item.date);
                                        const utcTimestamp = new Date(timestamp.getTime());
                                        const year = utcTimestamp.getUTCFullYear();
                                        const month = utcTimestamp.getUTCMonth() + 1;
                                        const day = utcTimestamp.getUTCDate();
                                        const hours = utcTimestamp.getUTCHours();
                                        const minutes = utcTimestamp.getUTCMinutes();
                                        const formattedMonth = month <= 9 ? `0${month}` : month;
                                        const formattedDay = day <= 9 ? `0${day}` : day;
                                        const formattedHours = hours <= 9 ? `0${hours}` : hours;
                                        const formattedMinutes = minutes <= 9 ? `0${minutes}` : minutes;
                                        return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}`;
                                    })()
                                }</td>
                                <td className="text-center">{item.temperature}</td>
                                <td className="text-center">{item.pressure}</td>
                                <td className="text-center">{item.precipitation} </td>
                                <td className="text-center">{item.windDirection}</td>
                                <td className="text-center">{item.windVelocity}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>

                <div>
                    <PaginationControl
                        page={page}
                        between={6}
                        total={pageSettings.totalElements}
                        limit={20}
                        changePage={(page) => {
                            console.log(page);
                            setPage(page);
                        }}
                        ellipsis={2}
                    />
                </div>
            </div>
        </div>
    );
};

export default WeatherData;

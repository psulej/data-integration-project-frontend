import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ExportImportMortalityData from "./ExportImportMortalityData";

const MortalityData = ({getAuthorizationHeaders}) => {
    const [page, setPage] = useState(0);
    const [mortalityData, setMortalityData] = useState([]);
    const [pageSettings, setPageSettings] = useState({});

    useEffect(() => {
        fetchWeatherData();
    }, [page]);

    const fetchWeatherData = () => {
        console.log('page: ', page);
        fetch(`http://localhost:8080/data/mortality?page=${page}`, {
            method: 'GET',
            headers: { ...getAuthorizationHeaders(), 'Content-Type': 'application/json' }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setMortalityData(data.content);
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
                <ExportImportMortalityData getAuthorizationHeaders={getAuthorizationHeaders}/>
                <div>
                    <PaginationControl
                        page={page}
                        between={6}
                        total={pageSettings.totalElements - 1}
                        limit={21}
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
                        <th className="text-center">Id</th>
                        <th className="text-center">Voivodeship</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Woman under 65 age</th>
                        <th className="text-center">Woman over 65 age</th>
                        <th className="text-center">Man under 65 age</th>
                        <th className="text-center">Man over 65 age</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mortalityData.length === 0 ? (
                        <tr>
                            <td colSpan="7">Loading weather data...</td>
                        </tr>
                    ) : (
                        mortalityData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.voivodeship.name}</td>
                                <td>{
                                    (() => {
                                        const timestamp = new Date(item.date);
                                        const utcTimestamp = new Date(timestamp.getTime());
                                        const year = utcTimestamp.getUTCFullYear();
                                        const month = utcTimestamp.getUTCMonth() + 1;
                                        if(month <= 9)
                                            return `${year}-0${month}`;
                                        return `${year}-${month}`;
                                    })()
                                }</td>
                                <td className="text-center">{item.womanUnder65Age}</td>
                                <td className="text-center">{item.womanOver65Age} </td>
                                <td className="text-center">{item.manUnder65Age}</td>
                                <td className="text-center">{item.manOver65Age}</td>
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
                        limit={21}
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

export default MortalityData;

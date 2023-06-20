import {Button, Col, Container, Row, Table} from "react-bootstrap";
import React, {useState} from "react";
const WeatherDataDetails = ({getAuthorizationHeaders}) => {
    const [weatherDataSummary, setWeatherDataSummary] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/ws/", {
                method: "POST",
                headers: {
                    "Content-Type": "text/xml; charset=utf-8",
                    ...getAuthorizationHeaders(),
                },
                body: `<?xml version="1.0" encoding="UTF-8"?>
                        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                        xmlns:dat="http://www.psulej.dev/dataintegrationprojectbackend">>
                          <soapenv:Header/>
                          <soapenv:Body>
                            <dat:getWeatherDataRequest/>
                          </soapenv:Body>
                        </soapenv:Envelope>
                    `,
            });

            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
            const averageWeatherDataNodes = xmlDoc.getElementsByTagName(
                "ns2:averageWeatherData"
            );
            const weatherDataArray = [];

            for (let i = 0; i < averageWeatherDataNodes.length; i++) {
                const averageWeatherDataNode = averageWeatherDataNodes[i];
                const year = averageWeatherDataNode.getElementsByTagName(
                    "ns2:year"
                )[0].textContent;
                const averageTemperature = averageWeatherDataNode.getElementsByTagName(
                    "ns2:averageTemperature"
                )[0].textContent;
                const averagePressure = averageWeatherDataNode.getElementsByTagName(
                    "ns2:averagePressure"
                )[0].textContent;
                const averageWindVelocity = averageWeatherDataNode.getElementsByTagName(
                    "ns2:averageWindVelocity"
                )[0].textContent;
                const averagePrecipitation = averageWeatherDataNode.getElementsByTagName(
                    "ns2:averagePrecipitation"
                )[0].textContent;

                const weatherData = {
                    year,
                    averageTemperature,
                    averagePressure,
                    averageWindVelocity,
                    averagePrecipitation,
                };
                weatherDataArray.push(weatherData);
            }

            setWeatherDataSummary(weatherDataArray);
            setIsTableVisible(true);
            console.log("weatherdataarray", weatherDataArray);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const hideTable = () => {
        setIsTableVisible(false);
    };

    const toggleTableVisibility = () => {
        setIsTableVisible(!isTableVisible);
    };

    const tableStyle = {
        color: "white",
        width: "fit-content",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <Container className="p-2">
            <Row className="justify-content-center align-items-center">
                <Col xs={12} md={8} lg={6}>
                    <Button onClick={isTableVisible ? hideTable : fetchData} className="w-100">
                        {isTableVisible ? "Hide year average summary" : "Show year average summary"}
                    </Button>
                </Col>
            </Row>
            {isTableVisible && (
                <Row className="justify-content-center align-items-center" >
                    <Table striped bordered hover style={tableStyle}>
                        <thead>
                        <tr>
                            <th className="text-center">Year</th>
                            <th className="text-center">Average Temperature</th>
                            <th className="text-center">Average Pressure</th>
                            <th className="text-center">Average Wind Velocity</th>
                            <th className="text-center">Average Precipitation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {weatherDataSummary.map((weatherData, index) => (
                            <tr key={index} >
                                <td className="text-center">{weatherData.year}</td>
                                <td className="text-center">{parseFloat(weatherData.averageTemperature).toFixed(2)}°C</td>
                                <td className="text-center">{parseFloat(weatherData.averagePressure).toFixed(2)}[Pa]</td>
                                <td className="text-center">{parseFloat(weatherData.averageWindVelocity).toFixed(2)}</td>
                                <td className="text-center">{parseFloat(weatherData.averagePrecipitation).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
            )}
        </Container>
    );
};

export default WeatherDataDetails;

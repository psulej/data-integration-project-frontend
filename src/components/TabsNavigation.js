import {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WeatherData from "./WeatherData";
import MortalityData from "./MortalityData";
import WeatherDataDetails from "./WeatherDataDetails";
import Summary from "./Summary";
import AdminPanel from "./AdminPanel";

function TabsNavigation({getAuthorizationHeaders, authData}) {
    const [key, setKey] = useState('home');

    // WEATHER DATA
    const [weatherData, setWeatherData] = useState([]);
    const [weatherPageSettings, setWeatherPageSettings] = useState({});
    const [weatherPage, setWeatherPage] = useState(1);
    const fetchWeatherData = () => {
        fetch(`http://localhost:8080/data/weather?page=${weatherPage-1}`, {
            method: 'GET',
            headers: { ...getAuthorizationHeaders(), 'Content-Type': 'application/json' }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setWeatherData(data.content);
                setWeatherPageSettings({
                    totalPages: data.totalPages,
                    totalElements: data.totalElements
                });
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    };
    
    // MORTALITY DATA
    const [mortalityPage, setMortalityPage] = useState(1);
    const [mortalityData, setMortalityData] = useState([]);
    const [mortalityPageSettings, setMortalityPageSettings] = useState({});
    const fetchMortalityData = () => {
        fetch(`http://localhost:8080/data/mortality?page=${mortalityPage - 1}`, {
            method: 'GET',
            headers: {...getAuthorizationHeaders(), 'Content-Type': 'application/json'}
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setMortalityData(data.content);
                setMortalityPageSettings({
                    totalPages: data.totalPages,
                    totalElements: data.totalElements
                });
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    };

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="home" title="Home">
                <div className="mx-4 p-4">
                    ▪ eksport/import z pliku XML – 5 pkt < br/>
                    ▪ eksport/import z pliku JSON/YAML – 5 pkt < br/>
                    ▪ eksport/import z bazy danych – 5 pkt < br/>
                    ▪ wykorzystanie ORM w celu dostępu do bazy danych– 5 pkt < br/>
                    ▪ wykorzystanie usług typu SOAP – 5 pkt < br/>
                    ▪ wykorzystanie usług typu REST – 5 pkt < br/>
                    ▪ wykorzystanie kontenerów Docker – 5 pkt < br/>
                    ▪ wykorzystanie mechanizmów uwierzytelnienia i autoryzacji przy użyciu tokenów
                    JWT – 5 pkt < br/>
                    ▪ wykorzystanie poziomów izolacji w bazie danych – 5 pkt < br/>
                </div>
            </Tab>
            <Tab eventKey="weather-data" title="Weather data">
                <WeatherDataDetails getAuthorizationHeaders={getAuthorizationHeaders}/>
                <WeatherData
                    getAuthorizationHeaders={getAuthorizationHeaders}
                    fetchWeatherData={fetchWeatherData}
                    pageSettings={weatherPageSettings}
                    weatherData={weatherData}
                    page={weatherPage}
                    setPage={setWeatherPage}
                />
            </Tab>
            <Tab eventKey="mortality-data" title="Mortality data">
                <MortalityData
                    getAuthorizationHeaders={getAuthorizationHeaders}
                    fetchMortalityData={fetchMortalityData}
                    pageSettings={mortalityPageSettings}
                    mortalityData={mortalityData}
                    page={mortalityPage}
                    setPage={setMortalityPage}
                />
            </Tab>
            <Tab eventKey="summary" title="Summary">
                <Summary getAuthorizationHeaders={getAuthorizationHeaders}/>
            </Tab>
            {authData.user.roles.includes("ADMIN") && (
                <Tab eventKey="manage-data" title="Admin CMS">
                    <AdminPanel
                        getAuthorizationHeaders={getAuthorizationHeaders}
                        fetchWeatherData={fetchWeatherData}
                        fetchMortalityData={fetchMortalityData}
                    />
                </Tab>
            )}
        </Tabs>
    );
}

export default TabsNavigation;
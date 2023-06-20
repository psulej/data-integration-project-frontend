import {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WeatherData from "./WeatherData";
import MortalityData from "./MortalityData";
import WeatherDataDetails from "./WeatherDataDetails";
import {Charts} from "./Charts";
import Summary from "./Summary";

function TabsNavigation({getAuthorizationHeaders}) {
    const [key, setKey] = useState('home');

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
                <WeatherData getAuthorizationHeaders={getAuthorizationHeaders}/>
            </Tab>
            <Tab eventKey="mortality-data" title="Mortality data">
                <MortalityData getAuthorizationHeaders={getAuthorizationHeaders}/>
            </Tab>
            <Tab eventKey="summary" title="Summary">
                {/*<Charts />*/}
                <Summary getAuthorizationHeaders={getAuthorizationHeaders}/>
            </Tab>
        </Tabs>
    );
}

export default TabsNavigation;